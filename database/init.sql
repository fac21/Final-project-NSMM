BEGIN;

DROP TABLE IF EXISTS interests, users, sessions, chats, events CASCADE;

SET timezone = 'Europe/London';

CREATE TABLE interests (
    id SERIAL PRIMARY KEY,
    interest_name TEXT NOT NULL,
    interest_icon TEXT
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    dob DATE NOT NULL,
    gender TEXT NOT NULL,
    interests_id INTEGER[],
    user_image TEXT NOT NULL,
    location INTEGER NOT NULL,
    bio VARCHAR(255) NOT NULL
);

CREATE TABLE sessions (
    sid TEXT PRIMARY KEY,
    data JSON NOT NULL
);

CREATE TABLE chats (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) on DELETE CASCADE,
    chat_messages VARCHAR(500)[],
    created_at TIMESTAMP
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) on DELETE CASCADE,
    interest_id INTEGER REFERENCES interests(id),
    event_title TEXT NOT NULL,
    event_description TEXT NOT NULL,
    created_at TIMESTAMP,
    time TEXT NOT NULL,
    location TEXT NOT NULL
);

-- INSERT INTO users(first_name, last_name, email, username, password, dob, gender, interest_id, user_image, location, bio) VALUES ('Safia', 'Ali', 's@g.com', 'sali', 'chummy01', 1988-08-18, 'female', 2, 'https://avatars.githubusercontent.com/u/69358550?v=4', 'London', 'I like coding and would like to meet for coffee'), ('Neville', 'Keemer', 'n@g.com', 'bytesized', 'chummy02', 1975-11-05, 'male', 1, 'https://avatars.githubusercontent.com/u/60395899?v=4', 'London', 'I like sport, music and the great outdooors and would like to meet for gig');

-- INSERT INTO interests(id, interest_name, interest_icon) VALUES (1, 'Go for a drink', 'https://storyset.com/illustration/outdoor-party/bro'), (2, 'Go for a Coffee', 'https://storyset.com/illustration/social-interaction/bro'), (3, Û'Go for a Walk', 'https://storyset.com/illustration/hiking/amico#92E3A9FF&hide=&hide=complete'), (4, 'Coding', 'https://storyset.com/illustration/pair-programming/amico#92E3A9FF&hide=&hide=complete');

-- INSERT INTO events(id, user_id, interest_id, event_title, event_description, created_at, location, time) VALUES (1, 1, 2, 'Anyone free for coffee, tues 8th June, 6pm?', 'I will be in Finsbury Park and will have a couple if hours free. Would love to meet up for coffee. Please message if available.', (SELECT_CURRENT_TIMESTAMP), 'London', 'evening'), (2, 2, 1, 'Drinks this weekend, central London', 'Anyone wanna go for a drink this weekend in central London please message me', (SELECT_CURRENT_TIMESTAMP), 'London', 'evening');

COMMIT;