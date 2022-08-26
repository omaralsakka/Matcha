SELECT 'CREATE DATABASE matcha'WHERE NOT EXISTS (SELECT FROM Databases WHERE datname = 'matcha')

##

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR (150) NOT NULL UNIQUE,
    email VARCHAR (150) NOT NULL UNIQUE,
    fullname VARCHAR (150) NOT NULL,
    password VARCHAR (150) NOT NULL,
    age INT,
    gender VARCHAR (150),
    sexuality VARCHAR (150),
    bio VARCHAR (300),
    tags VARCHAR [],
    fame_rating INT DEFAULT 0,
    city VARCHAR(150),
    country VARCHAR(150),
    coordinates NUMERIC [],
    blocked INT [],
    blocked_by INT [],
    liked INT [],
    liked_by INT [],
    views INT [],
    pictures INT DEFAULT 0,
    reports_by INT []
);

CREATE TABLE user_verify(
    id SERIAL PRIMARY KEY,
    username VARCHAR (150) NOT NULL UNIQUE,
	user_id INT,
    email VARCHAR (150) NOT NULL UNIQUE,
    fullname VARCHAR (150) NOT NULL,
    password VARCHAR (150) NOT NULL,
    age INT,
    verify_code VARCHAR (150) NOT NULL
);

CREATE TABLE user_search(
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE,
    age_range json,
    fame_range json,
    city VARCHAR (150),
    country VARCHAR (150),
    tags VARCHAR [100]
);

##
CREATE TABLE forgotten_password(
	id SERIAL PRIMARY KEY,
	email VARCHAR (150) NOT NULL,
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
	user_id INT NOT NULL,
    username VARCHAR (150),
	connections INT []
);

##
CREATE TABLE pictures (
    id SERIAL PRIMARY KEY UNIQUE,
    picture VARCHAR,
    user_id INT NOT NULL
);