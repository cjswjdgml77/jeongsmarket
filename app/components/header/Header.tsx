/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Heading from "../Heading";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="w-full mt-14 h-[70vh] bg-orange-100 flex flex-col sm:flex-row rounded-xl">
      <div className="flex flex-1 flex-col justify-center items-center text-center">
        <h1 className="text-3xl">Jeong's market</h1>
        <Heading
          title="Near by you"
          subtitle="Make your transaction nearby you"
        />
      </div>
      <div className="flex flex-1"></div>
    </div>
  );
};

export default Header;
