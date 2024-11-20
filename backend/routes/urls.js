const express = require('express');
const { createShortUrl, resolveShortUrl } = require('../services/urlService');
const config = require('../config');
const authenticateToken = require('./authMiddleware');
const router = express.Router();

// Route to fetch all short URLs for a user
router.get('/',authenticateToken,  async (req, res) => {
    const userId = req.user.userId; // Extracted from the JWT token
    
    try {
        const allUrls = [];

        // Query all shards
        for (let i = 0; i < config.shards.length; i++) {
            const shardPool = config.shards[i];
            const [rows] = await shardPool.query('SELECT short_url, long_url FROM url_table WHERE user_id = ?', [userId]);
            allUrls.push(...rows);
        }

        res.json({ urls: allUrls });
    } catch (error) {
        console.error('Error fetching URLs for user:', error);
        res.status(500).json({ message: 'Failed to fetch URLs' });
    }
});

// Create a short URL
router.post('/shorten', authenticateToken, async (req, res) => {
    const userId = req.user.userId;
    const { longUrl } = req.body;
    try {
        const shortUrl = await createShortUrl(longUrl, userId);
        res.status(201).json({ short_url: shortUrl, long_url:  longUrl});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Resolve a short URL
router.get('/:shortUrl', async (req, res) => {
    try {
        const longUrl = await resolveShortUrl(req.params.shortUrl);
        res.redirect(longUrl);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

module.exports = router;
