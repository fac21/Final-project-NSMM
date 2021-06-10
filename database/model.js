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

function getAllUserData() {
  const selectUsers = `
  SELECT * FROM users
  `;
  return db.query(selectUsers).then((res) => {
    return res.rows;
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

function getUserProfileById(id) {
  const selectUserDetailsFromProfileTable = `
  SELECT * FROM user_profiles WHERE id=$1
  `;
  return db.query(selectUserDetailsFromProfileTable, [id]).then((res) => {
    return res.rows[0];
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

function getAllEventResponses(id) {
  const selectEventResponse = `
  SELECT * FROM event_response WHERE event_id=$1
  `;
  return db.query(selectEventResponse, [id]).then((res) => {
    return res.rows;
  });
}

function getUsersNameFromComment(id) {
  const selectUserNameFromEventResponse = `
  SELECT name FROM users WHERE id=(SELECT user_id FROM event_response WHERE event_id=$1)
  `;
  return db.query(selectUserNameFromEventResponse, [id]).then((res) => {
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
  interests_id,
  event_title,
  event_description,
  location,
  date,
  time
) {
  const INSERT_EVENT = `
  INSERT INTO events(
   interests_id,
   event_title,
   event_description,
   location,
   date,
   time
 ) VALUES ($1, $2, $3,$4,$5,$6)
  RETURNING
  user_id
   interests_id,
   event_title,
   event_description,
   location,
   date,
   time;
  `;
  return db
    .query(INSERT_EVENT, [
      interests_id,
      event_title,
      event_description,
      location,
      date,
      time,
    ])
    //.then((result) => console.log(result)).catch((error) => { console.log(`error: ${error}`) })
    .then((res) => {
      return res.rows;
    })
  }


module.exports = {
  getAllInterestsData,
  getAllEventsData,
  getEventById,
  getAllUserDataByUsername,
  getAllEventResponses,
  getUserDataById,
  createEvent,
  getUsersNameFromComment,
  getUsersProfileUsingEmail,
  getUsersEventsUsingEmail,
  getAllUserData,
  getUserProfileById,
};
