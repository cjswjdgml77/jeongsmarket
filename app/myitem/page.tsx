import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import Heading from "../components/Heading";
import Container from "../components/Container";
import getUserItems from "../actions/getUserItems";
import MyList from "./MyList";

type Props = {};

const page = async (props: Props) => {
  const currentUser = await getCurrentUser();
  if (!currentUser?.email) return;
  // const mylist = await getUserItems({ email: currentUser.email });

  return (
    <>
      <Container>
        <div className="max-w-[980px] m-auto">
          <Heading title="My item list" />
          <MyList currentUser={currentUser} />
        </div>
      </Container>
    </>
  );
};

export default page;
