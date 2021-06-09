import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import Nav from "../components/Nav";
import Layout, { siteTitle } from "../components/Layout";
import Link from "next/link";

export default function CreateEvent() {
  const [session, loading] = useSession();
  const [content, setContent] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/secret");
      const json = await res.json();

      if (json.content) {
        setContent(json.content);
      }
    };
    fetchData();
  }, [session]);

  if (typeof window !== "undefined" && loading) return null;

  if (!session) {
    return (
      <Layout>
        <main>
          <div>
            <h1>You aren't signed in, please sign in first</h1>
            <button>
              <Link href="/">
                <a>Click here for the log in page</a>
              </Link>
            </button>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <h1>Create Event</h1>
        <form action="/events">
          <label for="interestType">Interest Type</label>
          <select id="interestType" name="interestType">
            <option value="Coffee">Coffee</option>
            <option value="Drink">Drink</option>
            <option value="Walk">Walk</option>
            <option value="Coding">Coding</option>
          </select>
          <label for="eventName">Event Name</label>
          <input type="text" id="eventName" name="eventName" required></input>
          <label for="location">Location</label>
          <input type="text" id="location" name="location" required></input>
          <label for="date">Date</label>
          <input type="date" id="date" name="date" required></input>
          <label for="time">Time</label>
          <select name="time" id="time" required>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="non-binary">Evening</option>
          </select>
          <label for="details">Specify details</label>
          <textarea type="text" id="details" name="details" required></textarea>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
      <Nav />
    </Layout>
  );
}

// function post(request, response) {
//   const data = request.body;
//   const values = Object.values(data);
//   db.query(
//     "INSERT INTO users(username, age, location) VALUES($1, $2, $3)",
//     values
//   ).then(() => {
//     response.redirect("/");
//   });
// }

// module.exports = { get, post };
