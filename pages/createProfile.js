// import Image from "next/image";
import Link from "next/link";
import Nav from "../components/Nav";
import Layout, { siteTitle } from "../components/Layout";
import { useState, useEffect } from "react";
import { options, useSession } from "next-auth/client";

export default function CreateProfile() {
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
  return (
    <Layout createProfile>
      <main>
        <div>
          <h1> Create a Chummy Profile </h1>
          <p> Complete the following: </p>
        </div>
        <form>
          <div>
            <label>Date of Birth</label>
            <input type="date"></input>
          </div>
          <div>
            <label>Gender</label>
            <select name="gender" id="gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
              <option value="rather-not-say">Rather not say</option>
            </select>
          </div>
          <div>
            <label>Location</label>
            <input type="text"></input>
          </div>
          <div>
            <label>Tell us a bit about yourself </label>
            <textarea type="text"></textarea>
          </div>
          <div>
            <label> Select interests</label>

            <input
              type="checkbox"
              id="interest1"
              name="interest1"
              value="drink"
            ></input>
            <label for="interest1"> Go for a drink</label>
            <input
              type="checkbox"
              id="interest2"
              name="interest2"
              value="coffee"
            ></input>
            <label for="interest2"> Go for coffee</label>
            <input
              type="checkbox"
              id="interest3"
              name="interest3"
              value="walk"
            ></input>
            <label for="interest3"> Go for a walk</label>
            <input
              type="checkbox"
              id="interest3"
              name="interest3"
              value="coding"
            ></input>
            <label for="interest3"> Coding</label>
          </div>

          <input type="submit" value="Submit"></input>
        </form>
      </main>
      <Nav />
    </Layout>
  );
}
