import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import Nav from "../components/Nav";
import Layout, { siteTitle } from "../components/Layout";
import Link from "next/link";
// import stylesheet from "../styles/styles";


export default function CreateEvent() {
  const addEventToDb = (event) => {
    event.preventDefault(); // don't redirect the page
    // where we'll add our form logic
    return fetch("/api/createEvent", {
      body: JSON.stringify({
        name: event.target.name.value,
        //name: 'test',
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    //const result = res.json();
  };

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
        <div>
          <h1>Hey {session.user.name}!</h1>
          <h2>Fill out the following form to create an event.</h2>
        </div>
        <form method="POST" action="/api/createEvent">
          {/* onSubmit={addEventToDb} */}
          <div>
            <label for="interest_id">Interest Type</label>
            <select id="interest_id" name="interest_id">
              <option value="Coffee">Coffee</option>
              <option value="Drink">Drink</option>
              <option value="Walk">Walk</option>
              <option value="Coding">Coding</option>
            </select>
          </div>
          <div>
            <label for="eventName">Event Name</label>
            <input
              type="text"
              id="event_title"
              name="event_title"
              required
            ></input>
          </div>
          <div>
            <label for="location">Location</label>
            <input type="text" id="location" name="location" required></input>
          </div>
          <div>
            <label for="date">Date</label>
            <input type="date" id="date" name="date" required></input>
          </div>
          <div>
            <label for="time">Time</label>
          </div>
          <div>
            <select name="time" id="time" required>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
            </select>
            <div>
              <label for="event_description">Specify details</label>
              <textarea
                type="text"
                id="event_description"
                name="event_description"
                required
              ></textarea>
            </div>
          </div>
          <div>
            <button type="submit" value="Submit">
              Submit!
            </button>
          </div>
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
