import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "./Layout.module.css";

const name = "Chummy";
export const siteTitle = "Chummy";

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        {/* <title>E-commerce | Home</title> */}
        <meta name="description" content="Chummy" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Link href="/events">
        <a>
        <h1 className={styles.header}>Chummy</h1>
        </a>
      </Link>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
