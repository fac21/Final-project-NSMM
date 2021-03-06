// import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import Nav from "../../components/Nav";
import Layout, { siteTitle } from "../../components/Layout";
import {
  getAllUserData,
  getUserDataById,
  getUserProfileById,
  //getUsersEventsbyUserId,
} from "../../database/model";

export async function getStaticPaths() {
  const user = await getAllUserData();
  const paths = user.map(({ id }) => {
    return {
      params: { idProfile: id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

// export async function
export async function getStaticProps({ params }) {
  const userData = await getUserDataById(params.idProfile);
  const userDataStr = JSON.stringify(userData);
  const userProfile = await getUserProfileById(params.idProfile);
  const userProfileStr = JSON.stringify(userProfile);
  // const userEvents = await getUsersEventsbyUserId(params.idProfile);
  // const userEventsStr = JSON.stringify(userEvents);

  return {
    props: {
      userDataStr,
      userProfileStr,
      //userEventsStr,
    },
  };
}

export default function Profile({
  userDataStr,
  userProfileStr,
  //userEventsStr,
}) {
  const [session, loading] = useSession();
  const [content, setContent] = useState();

  const userDataParsed = JSON.parse(userDataStr);
  // console.log("2", userDataParsed);

  const userProfileParsed = JSON.parse(userProfileStr);
  // console.log("3", userProfileParsed);

  //const userEventsParsed = JSON.parse(userEventsStr);
  // console.log("4", userEventsParsed);

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
      <Head>
            {/* <title>{siteTitle} |  {session.user.name}</title> */}
          </Head>
      <main>
        <div>
          <h1>{session.user.name}'s Profile</h1>
          {userDataParsed && userProfileParsed && (
            <>
              <h3>Username</h3>
              <p>{userProfileParsed.username}</p>
              <h3>About Me</h3>
              <p>{userProfileParsed.bio}</p>
              <h3>Location</h3>
              <p>{userProfileParsed.location}</p>
              <h3>Date of Birth</h3>
              <p>
                {new Intl.DateTimeFormat("en-GB", {
                  dateStyle: "full",
                }).format(new Date(userProfileParsed.dob))}
              </p>
              <h3>Gender</h3>
              <p>{userProfileParsed.gender}</p>
              <h3>My Events</h3>
              {/* <ul>
                {userData.events.map((event) => (
                  <li key={event.id}>
                    {event.date} ({event.time})<br />
                    {event.location}: {event.event_title}
                    <br />
                    {event.event_description}
                    <br />
                    <Link href="/events/[id]" as={`events/${event.id}`}>
                      <a> Click here to visit this event page</a>
                    </Link>
                  </li>
                ))}
              </ul> */}
            </>
          )}
        </div>
      </main>
      </div>
      <Nav />
    </Layout>
  );
}
