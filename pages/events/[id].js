import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Layout, { siteTitle } from "../../components/Layout";
import Nav from '../../components/Nav';
import { getAllEventsData, getEventById } from "../../database/model";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";


export async function getStaticPaths() {
    const events = await getAllEventsData();
    const paths = events.map(({ id }) => {
      return {
        params: { id: id.toString()},
      };
    });
    return {
        paths,
        fallback: false,
    };
  }

export async function getStaticProps({ params }) {
    const eventData = await getEventById(params.id);
    const eventDataStr = JSON.stringify(eventData);
    console.log(eventDataStr);
    return {
      props: { eventDataStr },
    };
  }

export default function Event( {eventDataStr} ) {
    const eventDataParsed = JSON.parse(eventDataStr);
 
    const gbDate = new Date(eventDataParsed.date);
    const ourDate = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format(gbDate);

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
      <main>
        <div>
          <h1>You aren't signed in, please sign in first</h1>
        </div>
      </main>
    );
  }
  
    return (
        <>
        <Layout>
            <div>
                <Head>
                    <title>{siteTitle.title} | Single event</title>
                </Head>
                <main className={styles.main}>
                    <div key={eventDataParsed.id}>
                        <h1>{eventDataParsed.event_title}</h1>
                        <p>{eventDataParsed.event_description}</p> 
                        <p>{ourDate}</p>
                    </div>
                    <form action='/events'>
                      <label htmlFor="response"></label>
                      <textarea id='response' name="response" rows='6' cols='50' placeholder="Type your response here"></textarea>
                      <button type="submit">Submit</button>
                      </form> 
                </main>
            </div>
        </Layout>
        <Nav/>
        </>
    )
}
