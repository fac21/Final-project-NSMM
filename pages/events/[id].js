import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Layout, { siteTitle } from "../../components/Layout";
import Nav from '../../components/Nav';
import {
  getAllEventsData,
  getEventById,
  getUserDataById,
} from "../../database/model";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import Image from "next/image";


export async function getStaticPaths() {
    const events = await getAllEventsData();
    const paths = events.map(({ id }) => {
      return {
        params: { id: id.toString()},
      };
    });
    return {
        paths,
        fallback: false,
    };
}

// export async function

export async function getStaticProps({ params }) {
  const eventData = await getEventById(params.id);
  const eventDataStr = JSON.stringify(eventData);
  const userDataById = await getUserDataById(params.id);
  const userDataByIdStr = JSON.stringify(userDataById);
    console.log(`userDataByIdStr: ${userDataByIdStr}`);
    return {
      props: { eventDataStr, userDataByIdStr },
    };
  }

export default function Event({ eventDataStr, userDataByIdStr }) {
  const eventDataParsed = JSON.parse(eventDataStr);

  const userDataParsed = JSON.parse(userDataByIdStr);
  console.log(eventDataParsed);
  const gbDate = new Date(eventDataParsed.date);
  const ourDate = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
  }).format(gbDate);

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

  return (
    <>
      <Layout>
        <div>
          <Head>
            <title>{siteTitle.title} | Single event</title>
          </Head>
          <main className={styles.main}>
            <div key={eventDataParsed.id}>
              <h1>{eventDataParsed.event_title}</h1>
              <h2>{userDataParsed.name}</h2>
              {/* <Image
                src={userDataParsed.image}
                alt="{userDataParsed.name}"
                width={500}
                height={500}
              /> */}

              <p>{eventDataParsed.event_description}</p>
              <p>
                <strong>Date of event:</strong> {ourDate}
              </p>
              <p>
                <strong>Time of event:</strong> {eventDataParsed.time}
              </p>
              <p>
                <strong>Location:</strong> {eventDataParsed.location}
              </p>
            </div>
            <div></div>
            <form action="/events">
              <label htmlFor="response"></label>
              <textarea
                id="response"
                name="response"
                rows="6"
                cols="50"
                placeholder="Type your response here"
              ></textarea>
              <button type="submit">Submit</button>
            </form>
          </main>
        </div>
      </Layout>
      <Nav />
    </>
  );
}
