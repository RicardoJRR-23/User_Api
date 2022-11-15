CREATE DATABASE user_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(50),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);


CREATE TABLE genders (
    id SERIAL PRIMARY KEY,
    gender VARCHAR(11)
); 


INSERT INTO genders(gender) VALUES('male');
INSERT INTO genders(gender) VALUES('female');
INSERT INTO genders(gender) VALUES('not defined');


CREATE TABLE people (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    birth DATE,
    gender_id INTEGER,
    user_id INTEGER NULL,
    FOREIGN KEY(gender_id) REFERENCES genders(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);