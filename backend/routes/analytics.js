const express = require('express');
const { getShardPool } = require('../services/db');

const router = express.Router();

// Record click analytics
router.post('/click', async (req, res) => {
    const { shortUrl, location, device } = req.body;

    try {
        const pool = getShardPool(shortUrl);

        // Find the URL ID
        const [rows] = await pool.query('SELECT id, long_url FROM url_table WHERE short_url = ?', [shortUrl]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        const urlId = rows[0].id;
        const long_url = rows[0].long_url;

        // Insert analytics data
        await pool.query(
            'INSERT INTO analytics_table (url_id, location, device) VALUES (?, ?, ?)',
            [urlId, location, device]
        );

        res.status(201).json({ message: 'Analytics recorded' , long_url:long_url});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Retrieve click analytics for a URL
router.get('/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;

    try {
        const pool = getShardPool(shortUrl);

        // Aggregate click data
        const [rows] = await pool.query(
            'SELECT COUNT(*) as click_count, location, device FROM analytics_table ' +
            'JOIN url_table ON url_table.id = analytics_table.url_id ' +
            'WHERE short_url = ? GROUP BY location, device',
            [shortUrl]
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
