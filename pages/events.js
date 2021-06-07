import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Footer from "../components/Footer";
import Layout, { siteTitle } from "../components/Layout";
import Link from "next/link";
import Nav from '../components/Nav';
import { getAllEventsData } from "../database/model";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";

export async function getServerSideProps() {
    const allEvents = await getAllEventsData();
    const eventData = JSON.stringify(allEvents);
    // const singleEvent = await getEventDate();
    // const dateOfEvent = JSON.stringify(singleEvent);

    return {
        props: {eventData},
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
     <main>
       <div>
         <h1>You aren't signed in, please sign in first</h1>
       </div>
     </main>
   );
 }

    const eventsArray = JSON.parse(eventData);
      
  return (
    <>
    <Layout home>
      <div className={styles.container}>
        <Head>
          <title>{siteTitle} | Chummy Board</title>
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>Home</h1>
          <Link href="/createEvent">
            <a>
            <button>Create Event</button>
            </a>
          </Link>
          <div className="styles.events">
              {
          eventsArray.map((meetup) => {
            const gbDate = new Date(meetup.date);
            const ourDate = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format(gbDate);
            console.log(meetup.date, gbDate)
              return (
                  <>
                  <Link href="/events/[id]"
                  as={`/events/${meetup.id}`}>
                  <a>
                  <div key={meetup.id}>
                      <p>{meetup.user_id}</p>
                      <p> {meetup.event_title}</p>
                      {/* <p>{meetup.created_at}</p> */}
                      <p>{meetup.location}</p>
                      <p>{ourDate}</p>
                      <p>{meetup.time}</p>
                  </div>
                  </a>
                  </Link>
                  </>
              )
          })
        }
          </div>

        </main>

      </div>
    </Layout>
    <Nav/>
    </>
  );
}
