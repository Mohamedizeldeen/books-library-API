const express = require('express');
const bcrypt = require('bcryptjs');
const { books, users } = require('./database');
const { authenticateToken, generateToken } = require('./auth');

const router = express.Router();

// Task 1: Get the book list available in the shop
router.get('/books', (req, res) => {
    try {
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving books", error: error.message });
    }
});

// Task 2: Get the books based on ISBN
router.get('/books/:isbn', (req, res) => {
    try {
        const isbn = req.params.isbn;
        const book = books[isbn];
        
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving book", error: error.message });
    }
});

// Task 3: Get all books by Author
router.get('/books/author/:author', (req, res) => {
    try {
        const author = req.params.author;
        const booksByAuthor = {};
        
        for (let isbn in books) {
            if (books[isbn].author.toLowerCase() === author.toLowerCase()) {
                booksByAuthor[isbn] = books[isbn];
            }
        }
        
        if (Object.keys(booksByAuthor).length > 0) {
            res.status(200).json(booksByAuthor);
        } else {
            res.status(404).json({ message: "No books found by this author" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving books by author", error: error.message });
    }
});

// Task 4: Get all books based on Title
router.get('/books/title/:title', (req, res) => {
    try {
        const title = req.params.title;
        const booksByTitle = {};
        
        for (let isbn in books) {
            if (books[isbn].title.toLowerCase().includes(title.toLowerCase())) {
                booksByTitle[isbn] = books[isbn];
            }
        }
        
        if (Object.keys(booksByTitle).length > 0) {
            res.status(200).json(booksByTitle);
        } else {
            res.status(404).json({ message: "No books found with this title" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving books by title", error: error.message });
    }
});

// Task 5: Get book Review
router.get('/books/:isbn/reviews', (req, res) => {
    try {
        const isbn = req.params.isbn;
        const book = books[isbn];
        
        if (book) {
            res.status(200).json(book.reviews);
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving reviews", error: error.message });
    }
});

// Task 6: Register New user
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Username, email, and password are required" });
        }
        
        // Check if user already exists
        const existingUser = users.find(user => user.username === username || user.email === email);
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create new user
        const newUser = {
            username,
            email,
            password: hashedPassword
        };
        
        users.push(newUser);
        
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
});

// Task 7: Login as a Registered user
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }
        
        // Find user
        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        // Generate token
        const token = generateToken(user);
        
        res.status(200).json({ 
            message: "Login successful", 
            token,
            user: { username: user.username, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
});

// Task 8: Add/Modify a book review (Registered users only)
router.put('/books/:isbn/reviews', authenticateToken, (req, res) => {
    try {
        const isbn = req.params.isbn;
        const { review } = req.body;
        const username = req.user.username;
        
        if (!review) {
            return res.status(400).json({ message: "Review text is required" });
        }
        
        const book = books[isbn];
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        
        // Add or modify review
        book.reviews[username] = review;
        
        res.status(200).json({ message: "Review added/modified successfully", reviews: book.reviews });
    } catch (error) {
        res.status(500).json({ message: "Error adding/modifying review", error: error.message });
    }
});

// Task 9: Delete book review added by that particular user
router.delete('/books/:isbn/reviews', authenticateToken, (req, res) => {
    try {
        const isbn = req.params.isbn;
        const username = req.user.username;
        
        const book = books[isbn];
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        
        if (!book.reviews[username]) {
            return res.status(404).json({ message: "Review not found for this user" });
        }
        
        // Delete review
        delete book.reviews[username];
        
        res.status(200).json({ message: "Review deleted successfully", reviews: book.reviews });
    } catch (error) {
        res.status(500).json({ message: "Error deleting review", error: error.message });
    }
});

module.exports = router;
