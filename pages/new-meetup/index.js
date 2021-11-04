//domain.com/new-meetup
import NewMeetUpForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from 'next/head';

const NewMeetUpPage = () => {
  const router = useRouter();
  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    console.log(data);

    router.push("/");
  }
  return (
    <>
      <Head>
        <title>Add New Meetups</title>
        <meta name="decription" content="Add new meetups" />
      </Head>
      <NewMeetUpForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetUpPage;
