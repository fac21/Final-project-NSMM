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
  // console.log(`allEvents: ${allEvents}`);
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
              <button className={styles.buttonStyle}>
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
            <title>{siteTitle} | Events</title>
          </Head>
          <main className={styles.main}>
            <Image
              src="/images/friends/Outdoor Party-bro.svg"
              alt="picture of friends"
              height={200}
              width={200}
            ></Image>
            <div className={styles.eventsBtn}>
              <h1 className={styles.title}>Events</h1>
              <Link href="/createEvent">
                <a>
                  <button className={styles.buttonStyle}>Add Event</button>
                </a>
              </Link>
            </div>
            <div className="styles.events">
              <hr className={styles.hrule}></hr>
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
                          {/* <p>{meetup.interests_id}</p> */}
                          <p>
                            {" "}
                            <h2 className={styles.h2Style}>Event: </h2>{" "}
                            {meetup.event_title}
                          </p>
                          {/* <p>{meetup.created_at}</p> */}
                          <p>
                            {" "}
                            <h2 className={styles.h2Style}>Location:</h2>{" "}
                            {meetup.location}
                          </p>
                          <p>
                            <h2 className={styles.h2Style}>Date:</h2> {ourDate}
                          </p>
                          <p>
                            <h2 className={styles.h2Style}>Time: </h2>
                            {meetup.time}
                          </p>
                          <p>
                            <h4 className={styles.link}>
                              Click here to read more
                            </h4>
                          </p>
                        </div>
                        <hr className={styles.hrule}></hr>
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
