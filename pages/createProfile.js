// import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import BlankNav from "../components/BlankNav";
import Layout, { siteTitle } from "../components/Layout";
import { useState, useEffect } from "react";
import { options, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function CreateProfile() {
  const router = useRouter();

  const addProfileToDb = (event) => {
    event.preventDefault(); // don't redirect the page
    // where we'll add our form logic
    return fetch("/api/createProfile", {
      body: JSON.stringify({
        //  test:  'hi'
        username: event.target.username.value,
        dob: event.target.dob.value,
        gender: event.target.gender.value,
        // interests_id: event.target.interests_id.value,
        location: event.target.location.value,
        bio: event.target.bio.value,
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
        <div>
          <Head>
            <title>{siteTitle} | Not Signed In</title>
          </Head>
          <main>
            <Image
              src="/images/friends/Ethnic friendship-bro.svg"
              alt="picture of friends"
              width={450}
              height={450}
            ></Image>
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
    router.push("/events");
  };

  return (
    <Layout createProfile>
      <div>
        <Head>
          <title>{siteTitle} | Create Profile</title>
        </Head>
        <main>
          <div>
            <h1>Hey {session.user.name}!</h1>
            <h2>Welcome to Chummy</h2>
            <p>
              <strong>Please create your user profile:</strong>
            </p>
          </div>
          <form onSubmit={addProfileToDb}>
            <div>
              <label htmlFor="username">Username</label>
              <br />
              <input type="text" name="username" id="username" required></input>
            </div>
            <div>
              <label htmlFor="dob">Date of Birth</label>
              <br />
              <input type="date" name="dob" id="dob" required></input>
            </div>
            <div>
              <label htmlFor="gender">Gender</label>
              <br />
              <select name="gender" id="gender" required>
                <option value="select">Select your option</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="rather-not-say">Rather not say</option>
              </select>
            </div>
            {/* <div>
              <label htmlFor="interests_id">

                Select interests (please select at least one)
              </label>
              <br />
              <input
                type="checkbox"
                id="interest1"
                name="interests_id"
                value="1"
              ></input>
              <label htmlFor="interest1"> Go for a drink</label>
              <br />
              <input
                type="checkbox"
                id="interest2"
                name="interests_id"
                value="2"
              ></input>
              <label htmlFor="interest2"> Go for coffee</label>
              <br />
              <input
                type="checkbox"
                id="interest3"
                name="interests_id"
                value="3"
              ></input>
              <label htmlFor="interest3"> Go for a walk</label>
              <br />
              <input
                type="checkbox"
                id="interest3"
                name="interests_id"
                value="4"
              ></input>
              <label htmlFor="interest3"> Coding</label>
            </div> */}
            <div>
              <label htmlFor="location">Location</label>
              <br />
              <input type="text" name="location" id="location" required></input>
            </div>
            <div>
              <label htmlFor="bio">Tell us a bit about yourself </label>
              <br />
              <textarea type="text" name="bio" id="bio" required></textarea>
            </div>
            {/* <button type="submit">Submit</button> */}
            <button
              className={styles.buttonStyle}
              onClick={handleClick}
              type="submit"
            >
              Submit
            </button>
          </form>
        </main>
      </div>
      <BlankNav />
    </Layout>
  );
}
