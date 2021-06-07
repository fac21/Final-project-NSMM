import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Footer from "../components/Footer";
import Layout, { siteTitle } from "../components/Layout";
import Link from "next/link";
import Nav from "../components/Nav";
import { getAllEventsData } from "../database/model";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";

export async function getServerSideProps() {
  const allEvents = await getAllEventsData();
  const eventData = JSON.stringify(allEvents);

  return {
    props: { eventData },
  };
}

export default function Events({ eventData }) {
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

  const eventsArray = JSON.parse(eventData);
  console.log(eventsArray);

  return (
    <>
      <Layout home>
        <div className={styles.container}>
          <Head>
            <title>{siteTitle} | Chummy Board</title>
          </Head>

          <main className={styles.main}>
            <h1 className={styles.title}>Chummy Event Board</h1>
            <Link href="/createEvent">
              <a>
                <button>Create A New Event</button>
              </a>
            </Link>
            <p>(Need to insert a filter)</p>
            <div className="styles.events">
              {eventsArray.map((meetup) => {
                return (
                  <>
                    <Link href="/events/[id]" as={`/events/${meetup.id}`}>
                      <a>
                        <div key={meetup.id}>
                          <p>{meetup.user_id}</p>
                          <p> {meetup.event_title}</p>
                          {/* <p>{meetup.created_at}</p> */}
                          <p>{meetup.location}</p>
                          <p>{meetup.time}</p>
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
