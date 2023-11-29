CREATE TABLE found_items_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(255),
    location VARCHAR(255),
    date DATE,
    color VARCHAR(255),
    description TEXT,
    image_path VARCHAR(255)
);