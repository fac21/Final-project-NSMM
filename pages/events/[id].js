import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Layout, { siteTitle } from "../../components/Layout";
import Nav from "../../components/Nav";
import {
  getAllEventsData,
  getEventById,
  getAllEventResponses,
  getUserDataById,
  getUsersNameFromComment,
} from "../../database/model";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import Image from "next/image";
import Link from "next/link";

export async function getStaticPaths() {
  const events = await getAllEventsData();
  console.log(events);
  const paths = events.map(({ id }) => {
    return {
      params: { id: id.toString() },
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

  console.log(`eventData.user_id:${eventData.user_id}`);

  const userDataById = await getUserDataById(eventData.user_id);
  // console.log(`userDataById: ${userDataById}`);
  const userDataByIdStr = JSON.stringify(userDataById);

  const eventResponseDataByEventId = await getAllEventResponses(params.id);
  const eventResponseDataByEventIdStr = JSON.stringify(
    eventResponseDataByEventId
  );

  const eventResponseCommenter = await getUsersNameFromComment(params.id);
  const eventResponseCommenterStr = JSON.stringify(eventResponseCommenter);

  return {
    props: {
      eventDataStr,
      userDataByIdStr,
      eventResponseDataByEventIdStr,
      eventResponseCommenterStr,
    },
  };
}

export default function Event({
  eventDataStr,
  userDataByIdStr,
  eventResponseDataByEventIdStr,
  eventResponseCommenterStr,
}) {
  const eventDataParsed = JSON.parse(eventDataStr);
  const userDataParsed = JSON.parse(userDataByIdStr);
  const eventResponseDataParsed = JSON.parse(eventResponseDataByEventIdStr);

  // user name who commented
  const eventResponseCommenter = JSON.parse(eventResponseCommenterStr);
  console.log(eventResponseCommenter);

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
      <Layout>
        <div className={styles.not_signed_in}>
          <Head>
            <title>{siteTitle.title} | Not Signed In</title>
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

  return (
    <>
      <Layout>
        <div className={styles.container}>
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

            <div className="styles.events">
              {eventResponseDataParsed.map((comment) => {
                // const gbDate = new Date(meetup.date);
                // const ourDate = new Intl.DateTimeFormat("en-GB", {
                //   dateStyle: "full",
                // }).format(gbDate);
                console.log(comment);
                return (
                  <>
                    <Link
                      href="/profiles/[id]"
                      as={`/profiles/${comment.user_id}`}
                    >
                      <a>
                        <div key={comment.id}>
                          <p>
                            <strong>Name: </strong>
                            {eventResponseCommenter[0].name}
                          </p>
                          <p>
                            <strong>Comment: </strong>
                            {comment.response_content}
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
      </Layout>
      <Nav />
    </>
  );
}
