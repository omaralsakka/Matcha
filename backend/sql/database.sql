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
    coordinates NUMERIC [] DEFAULT array[]::NUMERIC[],
    blocked INT [] DEFAULT array[]::NUMERIC[],
    blocked_by INT [] DEFAULT array[]::NUMERIC[],
    liked INT [] DEFAULT array[]::NUMERIC[],
    liked_by INT [] DEFAULT array[]::NUMERIC[],
    views INT [] DEFAULT array[]::NUMERIC[],
    pictures INT DEFAULT 0,
    reports_by INT [] DEFAULT array[]::NUMERIC[],
    status VARCHAR (150),
    last_logged_time TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
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

##
CREATE TABLE forgotten_password(
	id SERIAL PRIMARY KEY,
	email VARCHAR (150) NOT NULL,
	verify_code VARCHAR (150) NOT NULL
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
	connections INT [] DEFAULT array[]::NUMERIC[]
);

##
CREATE TABLE pictures (
    id SERIAL PRIMARY KEY UNIQUE,
    picture VARCHAR,
    user_id INT NOT NULL
);

##
CREATE TABLE chats (
	id SERIAL PRIMARY KEY UNIQUE,
	users VARCHAR [] DEFAULT array[]::varchar[],
	room_name VARCHAR (150),
	messages JSONB
);

##
CREATE TABLE notifications (
	id SERIAL PRIMARY KEY UNIQUE,
	user_id INT NOT NULL,
	notifications JSONB,
    date date DEFAULT NOW()::date,
    status VARCHAR (150) DEFAULT  'unseen'
);