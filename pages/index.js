import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout, { siteTitle } from "../components/Layout";
import Link from "next/link";
import Nav from '../components/Nav';
import Header from '../components/Header';
import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";

export default function LogIn() {
  const [session, loading] = useSession();
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Auth Examples</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header/>
        <main className={styles.main}>
          {!session && (
            <>
              Not signed in <br />
              <button onClick={signIn}>Sign In</button>
            </>
          )}
          {session && (
            <>
              Signed in as {session.user.email} <br />
              <button onClick={signOut}>sign out</button>
              <Nav/>
            </>
          )}
        </main>
      </div>
    </Layout>
  );
}
