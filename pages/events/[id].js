import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Layout, { siteTitle } from "../../components/Layout";
import Nav from '../../components/Nav';
import { getAllEventsData } from "../../database/model";

export async function getServerSideProps() {
    const allEvents = await getAllEventsData();
    const eventData = JSON.stringify(allEvents);
  
    return {
        props: {eventData},
    }
}

// export async function getStaticProps({ params }) {
//     const eventData = await getEventById(params.id);
//     return {
//       props: { eventData },
//     };
//   }


export default function Event(props) {
    return (
        <>
        <Layout>
            <div>
                <Head>
                    <title>{siteTitle.title} | Single event</title>
                </Head>
                <main className={styles.main}>
                    <div key={props.eventData.id}>
                        <h1>Single event</h1>
                        <p>{props.eventData.event_description}</p>
                    </div>
                </main>
            </div>
        </Layout>
        <Nav/>
        </>
    )
}