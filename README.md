# Book Review API

A comprehensive server-side online book review application with JWT authentication and REST API endpoints.

## Features

- **General Users:**
  - Get list of all books
  - Get books by ISBN
  - Get books by Author
  - Get books by Title
  - Get book reviews
  - User registration
  - User login

- **Registered Users:**
  - Add/Modify book reviews
  - Delete their own book reviews

- **Node.js Client Methods:**
  - Async/Await callback function for getting all books
  - Promise-based search by ISBN
  - Promise-based search by Author
  - Promise-based search by Title

## Project Structure

```
book-review-api/
├── package.json          # Dependencies and scripts
├── index.js              # Main server file
├── database.js           # Mock database with books and users
├── auth.js               # JWT authentication middleware
├── routes.js             # API routes and endpoints
├── client.js             # Client methods using Promises/Async-Await
└── README.md             # This file
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Public Endpoints

#### Task 1: Get all books
```
GET /api/books
```

#### Task 2: Get book by ISBN
```
GET /api/books/:isbn
```

#### Task 3: Get books by Author
```
GET /api/books/author/:author
```

#### Task 4: Get books by Title
```
GET /api/books/title/:title
```

#### Task 5: Get book reviews
```
GET /api/books/:isbn/reviews
```

#### Task 6: Register new user
```
POST /api/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Task 7: Login user
```
POST /api/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "password123"
}
```

### Protected Endpoints (Require JWT Token)

#### Task 8: Add/Modify book review
```
PUT /api/books/:isbn/reviews
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "review": "This is an excellent book!"
}
```

#### Task 9: Delete book review
```
DELETE /api/books/:isbn/reviews
Authorization: Bearer <jwt_token>
```

## Client Methods (Tasks 10-13)

The `client.js` file contains four methods demonstrating different async patterns:

### Task 10: Get all books using async callback
```javascript
getAllBooksAsync((error, books) => {
    if (error) {
        console.error('Error:', error.message);
    } else {
        console.log('Books:', books);
    }
});
```

### Task 11: Search by ISBN using Promises
```javascript
searchByISBN(1)
    .then(book => console.log('Book:', book))
    .catch(error => console.error('Error:', error.message));
```

### Task 12: Search by Author using Promises
```javascript
searchByAuthor('Jane Austen')
    .then(books => console.log('Books:', books))
    .catch(error => console.error('Error:', error.message));
```

### Task 13: Search by Title using Promises
```javascript
searchByTitle('Pride')
    .then(books => console.log('Books:', books))
    .catch(error => console.error('Error:', error.message));
```

## Testing

You can test the API using tools like:
- Postman
- curl
- Thunder Client (VS Code extension)
- Built-in client methods (run automatically when server starts)

## Sample Book Data

The application comes with 10 sample books:
1. "Things Fall Apart" by Chinua Achebe
2. "Fairy tales" by Hans Christian Andersen
3. "The Divine Comedy" by Dante Alighieri
4. "The Epic Of Gilgamesh" by Unknown
5. "The Book Of Job" by Unknown
6. "One Thousand and One Nights" by Unknown
7. "Njál's Saga" by Unknown
8. "Pride and Prejudice" by Jane Austen
9. "Le Père Goriot" by Honoré de Balzac
10. "Molloy, Malone Dies, The Unnamable, the trilogy" by Samuel Beckett

## Authentication

The application uses JWT (JSON Web Tokens) for authentication. After logging in, include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

All endpoints include proper error handling with appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict
- 500: Internal Server Error

## Security Features

- Password hashing using bcrypt
- JWT token authentication
- CORS enabled
- Input validation
- Error handling

## License

MIT License
