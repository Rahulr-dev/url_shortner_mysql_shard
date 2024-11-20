const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { loadShards } = require('./services/db');

// Import routes
const authRoutes = require('./routes/auth');
const urlRoutes = require('./routes/urls');
const analyticsRoutes = require('./routes/analytics');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Load shards before starting the server
(async () => {
    try {
        await loadShards(); // Load shard configurations from metadata DB
        
    } catch (error) {
        console.error('Error loading shards:', error);
        process.exit(1);
    }
})();

// Routes
app.use('/auth', authRoutes);           // Authentication routes
app.use('/urls', urlRoutes);            // URL shortening and retrieval
app.use('/analytics', analyticsRoutes); // Analytics routes

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

// Start server
const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
