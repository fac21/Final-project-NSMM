import Head from "next/head";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import Nav from "../components/Nav";
import Layout, { siteTitle } from "../components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";

// import stylesheet from "../styles/styles";

export default function CreateEvent() {
    const router = useRouter();

  const addEventToDb = (event) => {
    event.preventDefault(); // don't redirect the page
    // where we'll add our form logic
    return fetch("/api/createEvent", {
      body: JSON.stringify({
        interest_id: event.target.interest_id.value,
        event_title: event.target.event_title.value,
        location: event.target.location.value,
        date: event.target.date.value,
        time: event.target.time.value,
        event_description: event.target.event_description.value,
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

  const handleClick = (e) => {
    router.push("/events");
  };

  return (
    <Layout>
      <div>
      <Head>
            <title>{siteTitle} | Create Event</title>
          </Head>
        <div>
          <h1>Hey {session.user.name}!</h1>
          <h2>Fill out the following form to create an event.</h2>
        </div>

        <form onSubmit={addEventToDb}>
          <div>
          <label htmlFor="interest_id">Interest Type</label>
          <select id="interest_id" name="interest_id" required>
            <option value="2">Coffee</option>
            <option value="1">Drink</option>
            <option value="3">Walk</option>
            <option value="4">Coding</option>
          </select>
          </div>
          <div>
            <label htmlFor="event_title">Event Title</label>
            <input
              type="text"
              id="event_title"
              name="event_title"
              required
            ></input>
          </div>
          <div>
            <label htmlFor="location">Location</label>
            <input type="text" id="location" name="location" required></input>
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" name="date" required></input>
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <select name="time" id="time" required>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
            </select>
            <div>
              <label htmlFor="event_description">Specify details</label>
              <textarea
                type="text"
                id="event_description"
                name="event_description"
                required
              ></textarea>
            </div>
          </div>
          <div>
            <button onClick={handleClick} type="submit">Submit</button>
          </div>
        </form>
      </div>
      <Nav />
    </Layout>
  );
}
