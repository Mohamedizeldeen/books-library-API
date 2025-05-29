const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML test interface)
app.use(express.static(__dirname));

// Routes
app.use('/api', routes);

// Welcome route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'test_interface.html'));
});

// Test interface route
app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, 'test_interface.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Book Review API server is running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} for API information`);
    
    // Test the client methods after server starts
    setTimeout(() => {
        console.log('\n=== Testing Client Methods ===');
        const { testAllMethods } = require('./client');
        testAllMethods();
    }, 2000);
});

module.exports = app;
