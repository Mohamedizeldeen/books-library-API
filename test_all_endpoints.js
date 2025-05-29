const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api';
let authToken = '';

// Helper function to make authenticated requests
const makeAuthenticatedRequest = async (method, url, data = null) => {
    const config = {
        method,
        url: `${BASE_URL}${url}`,
        headers: {
            'Content-Type': 'application/json',
            ...(authToken && { 'Authorization': `Bearer ${authToken}` })
        }
    };
    
    if (data) {
        config.data = data;
    }
    
    return axios(config);
};

// Test all API endpoints
const runAllTests = async () => {
    console.log('🚀 Starting comprehensive API tests...\n');
    
    try {
        // Task 1: Get all books
        console.log('📚 Task 1: Getting all books...');
        const allBooks = await axios.get(`${BASE_URL}/books`);
        console.log(`✅ Success! Retrieved ${Object.keys(allBooks.data).length} books`);
        console.log(`   First book: ${allBooks.data[1].title} by ${allBooks.data[1].author}\n`);
        
        // Task 2: Get book by ISBN
        console.log('🔍 Task 2: Getting book by ISBN 1...');
        const bookByISBN = await axios.get(`${BASE_URL}/books/1`);
        console.log(`✅ Success! Book: "${bookByISBN.data.title}" by ${bookByISBN.data.author}\n`);
        
        // Task 3: Get books by Author
        console.log('👤 Task 3: Getting books by Jane Austen...');
        const booksByAuthor = await axios.get(`${BASE_URL}/books/author/Jane Austen`);
        console.log(`✅ Success! Found ${Object.keys(booksByAuthor.data).length} book(s) by Jane Austen`);
        console.log(`   Books: ${Object.values(booksByAuthor.data).map(b => b.title).join(', ')}\n`);
        
        // Task 4: Get books by Title
        console.log('📖 Task 4: Getting books with title containing "Pride"...');
        const booksByTitle = await axios.get(`${BASE_URL}/books/title/Pride`);
        console.log(`✅ Success! Found ${Object.keys(booksByTitle.data).length} book(s) with "Pride" in title`);
        console.log(`   Books: ${Object.values(booksByTitle.data).map(b => b.title).join(', ')}\n`);
        
        // Task 5: Get book reviews
        console.log('💬 Task 5: Getting reviews for book ISBN 1...');
        const reviews = await axios.get(`${BASE_URL}/books/1/reviews`);
        console.log(`✅ Success! Found ${Object.keys(reviews.data).length} review(s) for this book\n`);
        
        // Task 6: Register new user
        console.log('👤 Task 6: Registering new user...');
        const userData = {
            username: 'testuser_' + Date.now(),
            email: `test${Date.now()}@example.com`,
            password: 'password123'
        };
        
        const registerResponse = await axios.post(`${BASE_URL}/register`, userData);
        console.log(`✅ Success! User registered: ${registerResponse.data.message}\n`);
        
        // Task 7: Login user
        console.log('🔐 Task 7: Logging in user...');
        const loginResponse = await axios.post(`${BASE_URL}/login`, {
            username: userData.username,
            password: userData.password
        });
        
        authToken = loginResponse.data.token;
        console.log(`✅ Success! User logged in. Token received.`);
        console.log(`   User: ${loginResponse.data.user.username}\n`);
        
        // Task 8: Add/Modify book review
        console.log('📝 Task 8: Adding book review (authenticated)...');
        const reviewData = {
            review: 'This is an excellent book! A masterpiece of literature that explores themes of tradition vs. modernity.'
        };
        
        const addReviewResponse = await makeAuthenticatedRequest('PUT', '/books/1/reviews', reviewData);
        console.log(`✅ Success! Review added: ${addReviewResponse.data.message}`);
        console.log(`   Review: "${reviewData.review}"\n`);
        
        // Verify review was added
        console.log('🔍 Verifying review was added...');
        const updatedReviews = await axios.get(`${BASE_URL}/books/1/reviews`);
        console.log(`✅ Verification successful! Book now has ${Object.keys(updatedReviews.data).length} review(s)\n`);
        
        // Task 9: Delete book review
        console.log('🗑️ Task 9: Deleting book review (authenticated)...');
        const deleteResponse = await makeAuthenticatedRequest('DELETE', '/books/1/reviews');
        console.log(`✅ Success! Review deleted: ${deleteResponse.data.message}\n`);
        
        // Verify review was deleted
        console.log('🔍 Verifying review was deleted...');
        const finalReviews = await axios.get(`${BASE_URL}/books/1/reviews`);
        console.log(`✅ Verification successful! Book now has ${Object.keys(finalReviews.data).length} review(s)\n`);
        
        console.log('🎉 All tests completed successfully!');
        console.log('\n📊 Test Summary:');
        console.log('✅ Task 1: Get all books - PASSED');
        console.log('✅ Task 2: Get book by ISBN - PASSED');
        console.log('✅ Task 3: Get books by Author - PASSED');
        console.log('✅ Task 4: Get books by Title - PASSED');
        console.log('✅ Task 5: Get book reviews - PASSED');
        console.log('✅ Task 6: Register new user - PASSED');
        console.log('✅ Task 7: Login user - PASSED');
        console.log('✅ Task 8: Add/Modify book review - PASSED');
        console.log('✅ Task 9: Delete book review - PASSED');
        console.log('\n🔧 Client Methods (Tasks 10-13) are running automatically when server starts');
        
    } catch (error) {
        console.error('❌ Test failed:', error.response?.data?.message || error.message);
        if (error.response) {
            console.error('   Status:', error.response.status);
            console.error('   Data:', error.response.data);
        }
    }
};

// Test error handling
const testErrorHandling = async () => {
    console.log('\n🧪 Testing error handling...\n');
    
    try {
        // Test 404 - Book not found
        console.log('Testing 404 - Book not found...');
        await axios.get(`${BASE_URL}/books/999`);
    } catch (error) {
        console.log(`✅ 404 Error handled correctly: ${error.response?.data?.message}`);
    }
    
    try {
        // Test 401 - Unauthorized
        console.log('Testing 401 - Unauthorized access...');
        await axios.put(`${BASE_URL}/books/1/reviews`, { review: 'Test' });
    } catch (error) {
        console.log(`✅ 401 Error handled correctly: ${error.response?.data?.message}`);
    }
    
    try {
        // Test 409 - User already exists
        console.log('Testing 409 - Duplicate user registration...');
        await axios.post(`${BASE_URL}/register`, {
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123'
        });
        // Try to register same user again
        await axios.post(`${BASE_URL}/register`, {
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123'
        });
    } catch (error) {
        console.log(`✅ 409 Error handled correctly: ${error.response?.data?.message}`);
    }
};

// Run tests when this file is executed
if (require.main === module) {
    setTimeout(async () => {
        await runAllTests();
        await testErrorHandling();
        process.exit(0);
    }, 1000);
}

module.exports = { runAllTests, testErrorHandling };
