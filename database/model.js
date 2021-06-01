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

module.exports = {
  getAllInterestsData,
  getAllEventsData,
  getAllUserDataByUsername,
};
