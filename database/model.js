const db = require("./connection");

function getAllInterestsData() {
  const selectInterests = `
  SELECT * FROM interests
  `;
  return db.query(selectInterests).then((res) => {
    return res.rows;
  });
}

function getAllEventsData() {
  const selectEvents = `
  SELECT * FROM events
  `;
  return db.query(selectEvents).then((res) => {
    return res.rows;
  });
}

function getEventById(id) {
  const selectEvent = `
  SELECT * FROM events WHERE id=$1
  `;
  return db.query(selectEvent, [id]).then((res) => {
    return res.rows[0];
  });
}

function getAllUserDataByUsername(username) {
  const selectUserDetails = `
  SELECT * FROM users WHERE username=$1
  `;
  return db.query(selectUserDetails, [username]).then((res) => {
    return res.rows[0];
  });
}


function getUserDataById(id) {
  const selectUserDetailsFromUserTable = `
  SELECT * FROM users WHERE id=$1
  `;
  return db.query(selectUserDetailsFromUserTable, [id]).then((res) => {
    return res.rows[0];
  });
}

 function getAllEventResponses() {
  const selectEventResponse = `
  SELECT * FROM event_response WHERE event_id=$1
  `;
  return db.query(selectEventResponse, [event_id]).then((res) => {
    return res.rows;
  });
 }

 function getUsersProfileUsingEmail(email) {
  //get userID from users table using email (found in session and passed in)
  //get whole user_profile where user id returned above = the user_id in the user_profile table
  const userProfile = `
  SELECT * FROM user_profiles WHERE user_id = (SELECT id FROM users WHERE email = $1)
  `;
  return db.query(userProfile, [email]).then((res) => {
    return res.rows[0];
  });
}

function getUsersEventsUsingEmail(email) {
  //get userID from users table using email (found in session and passed in)
  //get userEvents where user id returned above = the user_id in the user_profile table
  const userProfile = `
  SELECT * FROM events WHERE user_id = (SELECT id FROM users WHERE email = $1)
  `;
  return db.query(userProfile, [email]).then((res) => {
    return res.rows;
  });
}

function createEvent(
  user_id,
  interests_id,
  event_title,
  event_description,
  location,
  date,
  time
) {
  const INSERT_EVENT = `
  INSERT INTO events(
   user_id,
   interests_id,
   event_title,
   event_description,
   location,
   date,
   time
 ) VALUES ($1, $2, $3,$4,$5,$6,$7)
  RETURNING user_id,
   interests_id,
   event_title,
   event_description,
   location,
   date,
   time;
  `;
  return db
    .query(INSERT_EVENT, [
      user_id,
      interests_id,
      event_title,
      event_description,
      location,
      date,
      time,
    ])
    .then((result) => result.rows[0]);
}


module.exports = {
  getAllInterestsData,
  getAllEventsData,
  getEventById,
  getAllUserDataByUsername,
  getAllEventResponses,
  getUserDataById,
  createEvent,
  getUsersProfileUsingEmail,
  getUsersEventsUsingEmail,
};
