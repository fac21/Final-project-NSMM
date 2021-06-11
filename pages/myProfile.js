// import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import Nav from "../components/Nav";
import Layout, { siteTitle } from "../components/Layout";
import { useRouter } from "next/router";
import Image from "next/image";

export default function MyProfile() {
  const [session, loading] = useSession();
  const [content, setContent] = useState();
  const [userData, setUserData] = useState();
  const router = useRouter();

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

  useEffect(() => {
    fetch("/api/userProfile")
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, [session]);
  console.log(userData);

  if (typeof window !== "undefined" && loading) return null;

  if (!session) {
    return (
      <Layout>
        <div>
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

  const handleClick = (e) => {
    e.preventDefault();
    router.push("/createProfile");
  };

  return (
    <Layout>
      <div className={styles.profile}>
        <Head>
          <title>{siteTitle} | My Profile</title>
        </Head>
        <main className={styles.main}>
          <Image
            src="/images/friends/Ethnic friendship-bro.svg"
            alt="picture of friends"
            width={250}
            height={250}
          ></Image>
          <div className={styles.events}>
            <h1>{session.user.name}'s Profile</h1>
            {userData && (
              <>
                <h3>Username</h3>
                <p>{userData.profile.username}</p>
                <h3>About Me</h3>
                <p>{userData.profile.bio}</p>
                <h3>Location</h3>
                <p>{userData.profile.location}</p>
                <h3>Date of Birth</h3>
                <p>
                  {new Intl.DateTimeFormat("en-GB", {
                    dateStyle: "full",
                  }).format(new Date(userData.profile.dob))}
                </p>
                <h3>Gender</h3>
                <p>{userData.profile.gender}</p>
                <h3>My Events</h3>
                <ul>
                  {userData.events.map((event) => (
                    <li className={styles.lists} key={event.id}>
                      {new Intl.DateTimeFormat("en-GB", {
                        dateStyle: "full",
                      }).format(new Date(event.date))}
                      ({event.time})<br />
                      {event.location}: {event.event_title}
                      <br />
                      {event.event_description}
                      <br />
                      <Link href="/events/[id]" as={`events/${event.id}`}>
                        <a className={styles.link}>
                          <strong>Click here to visit this event page</strong>{" "}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
                <br />
                <br />
                <button className={styles.buttonStyle} onClick={handleClick}>
                  Edit your profile
                </button>
              </>
            )}
          </div>
        </main>
      </div>
      <Nav />
    </Layout>
  );
}
