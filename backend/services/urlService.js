const { getShardPool } = require('./db');

// Generate a short URL
function generateShortUrl() {
    return Math.random().toString(36).substr(2, 8); // 8-character Base36 string
}

// Create a new short URL
async function createShortUrl(longUrl, userId) {
    const shortUrl = generateShortUrl();
    
    const pool = getShardPool(shortUrl);
   
    await pool.query('INSERT INTO url_table (short_url, long_url, user_id) VALUES (?, ?, ?)', [
        shortUrl,
        longUrl,
        userId,
    ]);

    return shortUrl;
}

// Resolve a short URL to the original
async function resolveShortUrl(shortUrl) {
    const pool = getShardPool(shortUrl);
    const [rows] = await pool.query('SELECT long_url FROM url_table WHERE short_url = ?', [shortUrl]);

    if (rows.length === 0) throw new Error('URL not found');
    return rows[0].long_url;
}

module.exports = { createShortUrl, resolveShortUrl };
