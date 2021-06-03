import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Layout, { siteTitle } from "../../components/Layout";
import Nav from "../../components/Nav";
import { getAllEventsData, getEventById } from "../../database/model";

export async function getStaticPaths() {
  const events = await getAllEventsData();
  const paths = events.map(({ id }) => {
    return {
      params: { id: id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const eventData = await getEventById(params.id);

  console.log(eventData);
  return {
    props: { eventData },
  };
}

export default function Event({ eventData }) {
  // const eventArray = JSON.parse(eventData);
  console.log(eventData);
  // console.log("eventArr", eventArray);
  return (
    <>
      <Layout>
        <div>
          <Head>
            <title>{siteTitle.title} | Single event</title>
          </Head>
          <main className={styles.main}>
            <div key={eventData.id}>
              <h1>Single event</h1>
              <p>{eventData.event_description}</p>
            </div>
          </main>
        </div>
      </Layout>
      <Nav />
    </>
  );
}