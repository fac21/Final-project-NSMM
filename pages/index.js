import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Footer from "../components/footer";
import Layout, { siteTitle } from "../components/layout";
import Link from "next/link";
import Nav from '../components/nav'

export default function Home() {
  return (
    <>
    <Layout home>
      <div className={styles.container}>
        <Head>
          <title>{siteTitle} | Chummy Board</title>
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>Home</h1>
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
