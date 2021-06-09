import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Layout, { siteTitle } from "../../components/Layout";
import Nav from '../../components/Nav';
import {
  getAllEventsData,
  getEventById,
  getAllEventResponses,
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
  console.log(`2A eventData: ${eventData}`);
  const eventDataStr = JSON.stringify(eventData);
  console.log(`2B eventDataStr: ${eventDataStr}`);

  const userDataById = await getUserDataById(params.id);
  const userDataByIdStr = JSON.stringify(userDataById);

  const eventResponseDataByEventId = await getAllEventResponses(params.id);
console.log(`1A eventResponseDataByEventId: ${eventResponseDataByEventId}`);

  const eventResponseDataByEventIdStr = JSON.stringify(eventResponseDataByEventId);

    console.log(
      `1B eventResponseDataByEventIdStr: ${eventResponseDataByEventIdStr}`);


    return {
      props: { eventDataStr, userDataByIdStr, eventResponseDataByEventIdStr },
    };
  }

export default function Event({
  eventDataStr,
  userDataByIdStr,
  eventResponseDataByEventIdStr,
}) {
  const eventDataParsed = JSON.parse(eventDataStr);
  const userDataParsed = JSON.parse(userDataByIdStr);
  const eventResponseDataParsed = JSON.parse(eventResponseDataByEventIdStr);

  console.log(`eventDataParsed: ${eventDataParsed}`);
  console.log(`eventResponseDataParsed: ${eventResponseDataParsed}`);

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
              <p>
                <strong>Event Host:</strong> {userDataParsed.name}
              </p>
              {/* <Image
                src={userDataParsed.image}
                alt="{userDataParsed.name + ' photo'}"
                width={500}
                height={500}
              /> */}

              <p>
                <strong>Event Description: </strong>
                {eventDataParsed.event_description}
              </p>
              <p>
                <strong>Date of event:</strong> {ourDate}
              </p>
              <p>
                <strong>Time of event:</strong> {eventDataParsed.time}
              </p>
              <p>
                <strong>Location:</strong> {eventDataParsed.location}
              </p>
              <p>
                <strong>Comments</strong>
              </p>
            </div>
            <form action="/events">
              <label htmlFor="response"></label>
              <textarea
                id="response"
                name="response"
                rows="6"
                cols="50"
                placeholder="Add a public comment"
              ></textarea>
              <button type="submit">Submit</button>
            </form>

            <div>
              <p>
                <strong>Name: </strong>
                {eventResponseDataParsed.user_id}
              </p>
              <p>
                <strong>Comment: </strong>
                {eventResponseDataParsed.response_content}
              </p>
            </div>
          </main>
        </div>
      </Layout>
      <Nav />
    </>
  );
}
