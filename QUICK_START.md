# 🚀 Quick Start Guide

## Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

## Installation & Setup

1. **Navigate to project directory:**
   ```bash
   cd "c:\Users\Mohamed Izeldeen\Downloads\ibm project"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:3001
   ```

## Testing

### Automated Testing
```bash
node test_all_endpoints.js
```

### Manual Testing
Use the web interface at `http://localhost:3001` or tools like Postman.

### Example API Calls

**Get all books:**
```bash
curl http://localhost:3001/api/books
```

**Register a user:**
```bash
curl -X POST http://localhost:3001/api/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:3001/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

## Project Structure
- `index.js` - Main server
- `routes.js` - API endpoints
- `auth.js` - JWT authentication
- `database.js` - Mock database
- `client.js` - Client methods (Tasks 10-13)
- `test_all_endpoints.js` - Test suite
- `test_interface.html` - Web interface

## Features Completed
✅ All 14 tasks (30 points)
✅ JWT Authentication
✅ Error Handling
✅ Web Interface
✅ Comprehensive Tests
✅ Documentation

## Ready for Submission! 🎉
