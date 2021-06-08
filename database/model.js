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

// function getEventDate() {
//   const selectDate = `
//   SELECT CONVERT(date, '2017-08-25', 103) FROM events
// `;
// return db.query(selectDate).then((res) => {
//   return res.rows;
// });
// }

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

 function getAllEventResponses() {
  const selectEventResponse = `
  SELECT * FROM event_response WHERE event_id=$1
  `;
  return db.query(selectEventResponse, [event_id]).then((res) => {
    return res.rows;
  });
 }



module.exports = {
  getAllInterestsData,
  getAllEventsData,
  getEventById,
  getAllUserDataByUsername,
  getAllEventResponses,
  //getEventDate,
};
