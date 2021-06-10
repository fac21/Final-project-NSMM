// import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import Nav from "../components/Nav";
import Layout, { siteTitle } from "../components/Layout";
import { useState, useEffect } from "react";
import { options, useSession } from "next-auth/client";

export default function CreateProfile() {
  const [session, loading] = useSession();
  const [content, setContent] = useState();
  console.log("hi", session);
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
    <Layout createProfile>
      <div>
      <Head>
            <title>{siteTitle} | Create Profile</title>
          </Head>
      <main>
        <div>
          <h1>
            Hey {session.user.name}, welcome to Chummy! <br />
            Please create your user profile...
          </h1>
          <p> Complete the following: </p>
        </div>
        <form>
          <div>
            <label htmlFor="dob">Date of Birth</label>
            <br />
            <input type="date" name="dob" id="dob" required></input>
          </div>
          <div>
            <label htmlFor="">Gender</label>
            <br />
            <select name="gender" id="gender" required>
              <option value="select">Select your option</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
              <option value="rather-not-say">Rather not say</option>
            </select>
          </div>
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
          <div>
            <label htmlFor="location">
              {" "}
              Select interests (please select at least one)
            </label>
            <br />
            <input
              type="checkbox"
              id="interest1"
              name="interest1"
              value="drink"
            ></input>
            <label htmlFor="interest1"> Go for a drink</label>
            <br />
            <input
              type="checkbox"
              id="interest2"
              name="interest2"
              value="coffee"
            ></input>
            <label htmlFor="interest2"> Go for coffee</label>
            <br />
            <input
              type="checkbox"
              id="interest3"
              name="interest3"
              value="walk"
            ></input>
            <label htmlFor="interest3"> Go for a walk</label>
            <br />
            <input
              type="checkbox"
              id="interest3"
              name="interest3"
              value="coding"
            ></input>
            <label htmlFor="interest3"> Coding</label>
          </div>

          <input type="submit" value="Submit"></input>
        </form>
      </main>
      </div>
      <Nav />
    </Layout>
  );
}

// export const getServerSideProps = useSession(async function ({ req, res }) {
//   // Get the user's session based on the request
//   const user = req.session.get("user");
//   console.log(user);
//   if (!user) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { user },
//   };
// });
