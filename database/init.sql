BEGIN;

DROP TABLE IF EXISTS users, sessions, activities, chats, events CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    dob INTEGER NOT NULL,
    gender TEXT NOT NULL,
    activity_id INTEGER REFERENCES activities(id) on DELETE CASCADE,
    image TEXT NOT NULL,
    location INTEGER NOT NULL,
    bio VARCHAR(255) NOT NULL
);

CREATE TABLE sessions (
    sid TEXT PRIMARY KEY,
    data JSON NOT NULL
);

CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
);

CREATE TABLE chats (

);

CREATE TABLE events (

);

COMMIT;