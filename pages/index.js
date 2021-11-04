import MeetupList from "../components/meetups/MeetupList";
import Head from 'next/head';
import { MongoClient } from "mongodb";


const HomePage = (props) => {
  return (
    <>
    <Head>
      <title>React Meetups</title>
      <meta name='decription' content='Browse a huge list of meetups' />
    </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};



// export async function getServerSideProps(context){
//   const req = context.req;
//   const res = context.res;
//   //fetch data
//   return {
//     props:{
//       meetups: DUMMY_MEETUPS,
//     }
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://raghul25:rarihesa@cluster0.j2hd9.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map(meetup=>({
        title:meetup.title,
        address:meetup.address,
        image:meetup.image,
        // description:meetup.description,
        id:meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
