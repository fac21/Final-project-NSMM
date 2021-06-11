import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout, { siteTitle } from "../components/Layout";
import Link from "next/link";
import Nav from "../components/Nav";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import BlankNav from "../components/BlankNav";
import stylesLayout from "../components/Layout.module.css";

export default function LogIn() {
  const [session, loading] = useSession();
  return (
    <Layout>
      <div>
        <Head>
          <title>Auth Examples</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          {!session && (
            <>
              <Image
                src="/images/friends/Ethnic friendship-bro.svg"
                alt="picture of friends"
                width={425}
                height={425}
              ></Image>
              <br />
              <div className={styles.events}>
                <button className={styles.buttonStyle} onClick={signIn}>
                  Sign In
                </button>
              </div>

              <BlankNav />
            </>
          )}
          {session && (
            <>
              <Image
                src="/images/friends/Ethnic friendship-bro.svg"
                alt="picture of friends"
                width={450}
                height={450}
              ></Image>
              <h2 className={stylesLayout.main}>
                Friendships <i>not</i>relationships
              </h2>
              {/* Signed in as {session.user.email} <br />
              <button onClick={signOut}>sign out</button> */}
              <Nav />
            </>
          )}
        </main>
      </div>
    </Layout>
  );
}
