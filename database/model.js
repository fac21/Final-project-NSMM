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
  getUsersNameFromComment,
};
