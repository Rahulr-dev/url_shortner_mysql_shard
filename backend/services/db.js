const mysql = require('mysql2/promise');
const config = require('../config');

// Connection to the metadata database
const metadataPool = mysql.createPool(config.metadataDb);

// Load shard configurations from metadata DB
async function loadShards() {
    
    const [rows] = await metadataPool.query('SELECT * FROM shard_mapping');
    config.shards = rows.map((shard) =>
        mysql.createPool({
            host: shard.db_host,
            user: shard.db_user,
            password: shard.db_password,
            database: shard.db_name,
            port: shard.db_port,
        })
    );
    
}

// Compute shard ID
function getShardId(shortUrl) {
    const hash = require('crypto').createHash('md5').update(shortUrl).digest('hex');
    return parseInt(hash, 16) % config.numShards;
}

// Query a specific shard
function getShardPool(shortUrl) {
    const shardId = getShardId(shortUrl);
    
    return config.shards[shardId];
}

module.exports = { loadShards, getShardPool };
