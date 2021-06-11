BEGIN;

DROP TABLE IF EXISTS chats, accounts, sessions, users, verification_requests, interests, user_profiles, events, event_response CASCADE;

SET timezone = 'Europe/London';

CREATE TABLE accounts
  (
    id                   SERIAL,
    compound_id          VARCHAR(255) NOT NULL,
    user_id              INTEGER NOT NULL,
    provider_type        VARCHAR(255) NOT NULL,
    provider_id          VARCHAR(255) NOT NULL,
    provider_account_id  VARCHAR(255) NOT NULL,
    refresh_token        TEXT,
    access_token         TEXT,
    access_token_expires TIMESTAMPTZ,
    created_at           TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at           TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE TABLE sessions
  (
    id            SERIAL,
    user_id       INTEGER NOT NULL,
    expires       TIMESTAMPTZ NOT NULL,
    session_token VARCHAR(255) NOT NULL,
    access_token  VARCHAR(255) NOT NULL,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE TABLE users
  (
    id             SERIAL,
    name           VARCHAR(255),
    email          VARCHAR(255),
    email_verified TIMESTAMPTZ,
    image          TEXT,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE TABLE verification_requests
  (
    id         SERIAL,
    identifier VARCHAR(255) NOT NULL,
    token      VARCHAR(255) NOT NULL,
    expires    TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

  CREATE TABLE interests (
    id SERIAL PRIMARY KEY,
    interest_name TEXT NOT NULL,
    interest_icon TEXT
);

CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) on DELETE CASCADE,
    -- name VARCHAR(255) NOT NULL REFERENCES users(name),
    username VARCHAR(255) UNIQUE NOT NULL,
    -- email TEXT NOT NULL REFERENCES users(email),
    password TEXT ,
    dob DATE NOT NULL,
    gender TEXT NOT NULL,
    interests_id INTEGER[],
    -- user_image TEXT REFERENCES users(image),
    location TEXT NOT NULL,
    bio VARCHAR(255) NOT NULL
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) on DELETE CASCADE,
    interests_id INTEGER REFERENCES interests(id),
    event_title TEXT NOT NULL,
    event_description TEXT NOT NULL,
    -- created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    location TEXT NOT NULL,
    date date NOT NULL,
    time TEXT NOT NULL
);

CREATE TABLE event_response (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) on DELETE CASCADE,
    response_content TEXT NOT NULL,
    -- created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    event_id INTEGER REFERENCES events(id)
);

INSERT INTO accounts (compound_id, user_id, provider_type, provider_id, provider_account_id, access_token, created_at, updated_at) VALUES ('614e6acd8926044c978b9058b04c370ac109a7e34b4c3d9162c49c5f2d3e32ee', 1, 'oauth', 'auth0', 'auth0|60bdf6116eb8f600688e7939', 'bsYavHs8K_aTyWY1p_t7advKuT7sVhR-', '2021-06-07 11:58:23.815768+01', '2021-06-07 11:58:23.815768+01'),
('decef9f7a683e28eb9b5538f97f6cf92923c843dd3238fd3ae1dda0f1c5cb422', 2, 'oauth', 'auth0', 'auth0|60bdf6c17634b50069321add', '64lXnBeY53_eaM8YPtph7pUv3PZb8BZq', '2021-06-07 11:59:59.129057+01', '2021-06-07 11:59:59.129057+01');

INSERT INTO users(name, email, image, created_at, updated_at) VALUES
('Jo Smith', 'fac21testing@gmail.com', 'https://s.gravatar.com/avatar/8c6896d94c218a82e69b3d9cb4fd7713?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Ffa.png', '2021-06-07 11:58:23.807084+01', '2021-06-07 11:58:23.807084+01'),
('Ashley Stewart', 'fac21testing2@gmail.com', 'https://s.gravatar.com/avatar/c1d1d7338d4df3abb4539002ef96519d?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Ffa.png', '2021-06-07 11:59:59.074831+01', '2021-06-07 11:59:59.074831+01');

INSERT INTO interests(interest_name, interest_icon) VALUES
('Go for a Drink', 'https://storyset.com/illustration/outdoor-party/bro'),
('Go for a Coffee', 'https://storyset.com/illustration/social-interaction/bro'),
('Go for a Walk', 'https://storyset.com/illustration/hiking/amico#92E3A9FF&hide=&hide=complete'),
('Coding', 'https://storyset.com/illustration/pair-programming/amico#92E3A9FF&hide=&hide=complete')
;

INSERT INTO events(user_id, interests_id, event_title, event_description, location, date, time) VALUES
(1, 2, 'Anyone free for coffee, tues 8th June, 6pm?', 'I will be in Finsbury Park and will have a couple if hours free. Would love to meet up for coffee. Please reply below!', 'London', '2021-06-08', 'afternoon'),
(2, 1, 'Drinks this weekend, central London', 'Anyone wanna go for a drink this weekend in central London please let me know below!', 'London', '2021-06-09', 'evening')
;

INSERT INTO event_response (user_id, response_content, event_id) VALUES
(2, 'Hi, I will be there! Looking forward to it :)', 1),
(1, 'Looking forward to having a beer after a long week – see you there!', 2)
;

INSERT INTO user_profiles(user_id, username, dob, gender, interests_id, location, bio) VALUES (1, 'smithy1', '1980-01-01', 'male', (ARRAY[1,2, 4]), 'London', 'I like coding and would like to meet for coffee or a pint'), (2, 'Ash1', '1980-01-01', 'female', (ARRAY[1,2,3]), 'London', 'I love hiking and nature and would be keen to mix this up with meeting for the odd coffee')
;


CREATE UNIQUE INDEX compound_id
  ON accounts(compound_id);

CREATE INDEX provider_account_id
  ON accounts(provider_account_id);

CREATE INDEX provider_id
  ON accounts(provider_id);

CREATE INDEX user_id
  ON accounts(user_id);

CREATE UNIQUE INDEX session_token
  ON sessions(session_token);

CREATE UNIQUE INDEX access_token
  ON sessions(access_token);

CREATE UNIQUE INDEX email
  ON users(email);

CREATE UNIQUE INDEX token
  ON verification_requests(token);

COMMIT;
