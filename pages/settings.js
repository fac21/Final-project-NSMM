// import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import Nav from "../components/Nav";
import Layout, { siteTitle } from "../components/Layout";

export default function Settings() {
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
      <main>
        <div>
          <h1>Settings Page</h1>
          <p>(Need to Insert ability to change password and log out button)</p>
        </div>
      </main>
      <Nav />
    </Layout>
  );
}
