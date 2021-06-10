import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout, { siteTitle } from "../components/Layout";
import Link from "next/link";
import Nav from "../components/Nav";
import { getAllEventsData } from "../database/model";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";

export async function getServerSideProps() {
  const allEvents = await getAllEventsData();
  console.log(`allEvents: ${allEvents}`);
  const eventData = JSON.stringify(allEvents);

  return {
    props: { eventData },
  };
}

export default function Events({ eventData }) {
  console.log(`eventData: ${eventData}`);
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
        <div className={styles.not_signed_in}>
          <Head>
            <title>{siteTitle} | Not Signed In</title>
          </Head>
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
        </div>
      </Layout>
    );
  }

  const eventsArray = JSON.parse(eventData);

  return (
    <>
      <Layout home>
        <div>
          <Head>
            <title>{siteTitle} | Chumboard</title>
          </Head>
          <main className={styles.main}>
            <h1 className={styles.title}>Chumboard</h1>
            <Link href="/createEvent">
              <a>
                <button>Create Event</button>
              </a>
            </Link>
            <p>(Need to insert a filter)</p>
            <div className="styles.events">
              {eventsArray.map((meetup) => {
                const gbDate = new Date(meetup.date);
                const ourDate = new Intl.DateTimeFormat("en-GB", {
                  dateStyle: "full",
                }).format(gbDate);
                console.log(meetup.date, gbDate);
                return (
                  <>
                    <Link href="/events/[id]" as={`/events/${meetup.id}`}>
                      <a>
                        <div key={meetup.id}>
                          <p>{meetup.interests_id}</p>
                          <p>
                            {" "}
                            <strong>Event: </strong> {meetup.event_title}
                          </p>
                          {/* <p>{meetup.created_at}</p> */}
                          <p>
                            {" "}
                            <strong>Location</strong>: {meetup.location}
                          </p>
                          <p>
                            <strong>Date:</strong> {ourDate}
                          </p>
                          <p>
                            <strong>Time: </strong>
                            {meetup.time}
                          </p>
                        </div>
                      </a>
                    </Link>
                  </>
                );
              })}
            </div>
          </main>
        </div>
        <Nav />
      </Layout>
    </>
  );
}
