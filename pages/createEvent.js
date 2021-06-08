import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import Nav from "../components/Nav";
import Layout, { siteTitle } from "../components/Layout";
import Link from "next/link";

export default function CreateEvent() {
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
    <Layout>
      <div>
        <h1>Create Event</h1>
        <form>
          <label>Event</label>
          <input></input>
          <label>Location</label>
          <input></input>
          <label>Date</label>
          <input></input>
          <label>Specify details</label>
          <textarea></textarea>
        </form>
      </div>
      <Nav />
    </Layout>
  );
}
