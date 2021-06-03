import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Footer from "../components/Footer";
import Layout, { siteTitle } from "../components/Layout";
import Link from "next/link";
import Nav from '../components/Nav'

export default function Home() {
  return (
    <>
    <Layout home>
      <div className={styles.container}>
        <Head>
          <title>{siteTitle} | Chummy Board</title>
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>Vercel is working</h1>
          <Link href="/createEvent">
            <a>
            <button>Create Event</button>
            </a>
          </Link>
        </main>
      </div>
    </Layout>
    <Nav/>
    </>
  );
}
