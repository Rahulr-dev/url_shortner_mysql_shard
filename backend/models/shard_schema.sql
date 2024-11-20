CREATE TABLE url_table (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    short_url VARCHAR(8) NOT NULL UNIQUE,
    long_url TEXT NOT NULL,
    user_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE analytics_table (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    url_id BIGINT NOT NULL,
    click_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    location VARCHAR(255),
    device VARCHAR(255),
    FOREIGN KEY (url_id) REFERENCES url_table(id)
);