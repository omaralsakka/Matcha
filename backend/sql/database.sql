SELECT 'CREATE DATABASE matcha'WHERE NOT EXISTS (SELECT FROM Databases WHERE datname = 'matcha')

##

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR (150) NOT NULL,
    email VARCHAR (150) NOT NULL,
    fullname VARCHAR (150) NOT NULL,
    password VARCHAR (150) NOT NULL,
    age INT,
    gender VARCHAR (150),
    sexuality VARCHAR (150),
    bio VARCHAR (300),
    tags VARCHAR [],
    fame_rating INT DEFAULT 0,
    location VARCHAR (150),
    blocked INT [],
    blocked_by INT [],
    liked INT [],
    liked_by INT [],
    views INT [],
    pictures INT DEFAULT 0
);

CREATE TABLE user_verify(
    id SERIAL PRIMARY KEY,
    username VARCHAR (150) NOT NULL,
    email VARCHAR (150) NOT NULL,
    fullname VARCHAR (150) NOT NULL,
    password VARCHAR (150) NOT NULL,
    age INT,
    verify_code VARCHAR (150) NOT NULL
);

##
CREATE TABLE tags (
	id SERIAL PRIMARY KEY,
	description VARCHAR (150) NOT NULL,
	user_id INT NOT NULL
);

##
CREATE TABLE location (
	id SERIAL PRIMARY KEY,
	city VARCHAR (150) NOT NULL,
	country VARCHAR (150) NOT NULL,
	user_id INT NOT NULL
);

##
CREATE TABLE connected (
    id SERIAL PRIMARY KEY,
    users_id INT NOT NULL,
    chat_jsonb NOT NULL
);

##
CREATE TABLE pictures (
    id SERIAL PRIMARY KEY UNIQUE,
    picture VARCHAR,
    user_id INT NOT NULL
);