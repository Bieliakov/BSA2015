CREATE DATABASE IF NOT EXISTS 12_rest_sails;

USE 12_rest_sails;

CREATE TABLE IF NOT EXISTS country
(
    name VARCHAR(50) PRIMARY KEY,
    description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS hotel
(
    id SERIAL,
    name VARCHAR(50),
    country VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    CONSTRAINT hotel_country FOREIGN KEY(country)
        REFERENCES country(name)
); 

INSERT INTO country (name, description) VALUES
    ("Ukraine", "Ukraine country description"),
    ("UK", "United Kingdom country description");

INSERT INTO hotel (id, name, country, description) VALUES
    (1, "Tourist", "Ukraine", "Tourist hotel description"),
    (2, "Slavutych", "Ukraine", "Slavutych hotel description"),
    (3, "Karavella", "Ukraine", "Karavella hotel description"),
    (4, "Great Palace", "UK", "Great Palace hotel description"),
    (5, "Riviera", "UK", "Riviera hotel description"),
    (6, "Long river", "UK", "Long river hotel description");
    
