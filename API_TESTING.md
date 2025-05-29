# Example API Testing Commands

## Using curl to test the API endpoints

### 1. Get all books (Task 1)
```bash
curl -X GET http://localhost:3000/api/books
```

### 2. Get book by ISBN (Task 2)
```bash
curl -X GET http://localhost:3000/api/books/1
```

### 3. Get books by Author (Task 3)
```bash
curl -X GET "http://localhost:3000/api/books/author/Jane Austen"
```

### 4. Get books by Title (Task 4)
```bash
curl -X GET "http://localhost:3000/api/books/title/Pride"
```

### 5. Get book reviews (Task 5)
```bash
curl -X GET http://localhost:3000/api/books/1/reviews
```

### 6. Register new user (Task 6)
```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 7. Login user (Task 7)
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

### 8. Add/Modify book review (Task 8) - Requires token
```bash
# First login to get token, then use it:
curl -X PUT http://localhost:3000/api/books/1/reviews \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "review": "This is an excellent book! Highly recommended."
  }'
```

### 9. Delete book review (Task 9) - Requires token
```bash
curl -X DELETE http://localhost:3000/api/books/1/reviews \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## Testing with Postman

1. **Create a new collection** in Postman called "Book Review API"

2. **Import the endpoints** above as requests

3. **Set up environment variables:**
   - `baseUrl`: `http://localhost:3000/api`
   - `token`: (will be set after login)

4. **For authentication:**
   - First register a user
   - Then login to get the JWT token
   - Save the token and use it in subsequent requests

## Screenshots for Peer Review

Take screenshots of:
1. Successful response from GET /api/books
2. Successful response from GET /api/books/1
3. Successful response from GET /api/books/author/Jane%20Austen
4. Successful response from GET /api/books/title/Pride
5. Successful response from GET /api/books/1/reviews
6. Successful user registration
7. Successful user login with JWT token
8. Successful book review addition (with authentication)
9. Successful book review deletion (with authentication)
10. Console output showing async/await and Promises working
11. Node.js methods running in terminal
12. Error handling examples (401, 404, etc.)
13. JWT token validation working
14. Server running successfully
