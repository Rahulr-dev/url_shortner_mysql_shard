CREATE TABLE shard_mapping (
    shard_id INT PRIMARY KEY,
    db_name VARCHAR(255) NOT NULL,
    db_host VARCHAR(255) NOT NULL,
    db_port INT NOT NULL,
    db_user VARCHAR(255) NOT NULL,
    db_password VARCHAR(255) NOT NULL
);

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

