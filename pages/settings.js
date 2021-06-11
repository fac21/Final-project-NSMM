import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/client";
import Nav from "../components/Nav";
import Layout, { siteTitle } from "../components/Layout";
import styles from "../styles/Home.module.css";

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
        <div className={styles.not_signed_in}>
          <Head>
            <title>{siteTitle} | Not Signed In</title>
          </Head>
          <main className="styles.main">
            <Image
              src="/images/friends/True friends-bro.svg"
              alt="picture of friends"
              width={450}
              height={450}
            ></Image>
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
    <Layout>
      <Image
        src="/images/friends/True friends-bro.svg"
        alt="picture of friends"
        width={450}
        height={450}
      ></Image>
      <div>
        <Head>
          <title>{siteTitle} | Settings</title>
        </Head>
        <main>
          <div className={styles.events}>
            <button className={styles.buttonStyle} onClick={signOut}>
              Log Out
            </button>
          </div>
        </main>
      </div>
      <Nav />
    </Layout>
  );
}
