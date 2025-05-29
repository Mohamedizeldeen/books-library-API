const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api';

// Task 10: Get all books – Using async callback function
const getAllBooksAsync = async (callback) => {
    try {
        const response = await axios.get(`${BASE_URL}/books`);
        callback(null, response.data);
    } catch (error) {
        callback(error, null);
    }
};

// Task 11: Search by ISBN – Using Promises
const searchByISBN = (isbn) => {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/books/${isbn}`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

// Task 12: Search by Author – Using Promises
const searchByAuthor = (author) => {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/books/author/${encodeURIComponent(author)}`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

// Task 13: Search by Title – Using Promises
const searchByTitle = (title) => {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/books/title/${encodeURIComponent(title)}`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

// Test functions
const testAllMethods = async () => {
    console.log('=== Testing Book Review API Methods ===\n');
    
    // Test 1: Get all books using async callback
    console.log('1. Testing getAllBooksAsync (async callback):');
    getAllBooksAsync((error, books) => {
        if (error) {
            console.error('Error:', error.message);
        } else {
            console.log('Success: Retrieved', Object.keys(books).length, 'books');
            console.log('First book:', books[1]);
        }
    });
    
    // Wait a bit for the callback to complete
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Test 2: Search by ISBN using Promises
    console.log('\n2. Testing searchByISBN (Promises):');
    try {
        const book = await searchByISBN(1);
        console.log('Success: Found book by ISBN 1:', book);
    } catch (error) {
        console.error('Error:', error.message);
    }
    
    // Test 3: Search by Author using Promises
    console.log('\n3. Testing searchByAuthor (Promises):');
    try {
        const books = await searchByAuthor('Jane Austen');
        console.log('Success: Found books by Jane Austen:', books);
    } catch (error) {
        console.error('Error:', error.message);
    }
    
    // Test 4: Search by Title using Promises
    console.log('\n4. Testing searchByTitle (Promises):');
    try {
        const books = await searchByTitle('Pride');
        console.log('Success: Found books with title containing "Pride":', books);
    } catch (error) {
        console.error('Error:', error.message);
    }
};

module.exports = {
    getAllBooksAsync,
    searchByISBN,
    searchByAuthor,
    searchByTitle,
    testAllMethods
};
