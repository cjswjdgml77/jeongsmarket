/* eslint-disable react/no-unescaped-entities */
"use client";
import { motion } from "framer-motion";
import Heading from "../Heading";
import Image from "next/image";
import bg from "../../../public/stuffbg.jpg";
import { useEffect, useState } from "react";
type Props = {};

const Header = (props: Props) => {
  const banner = document.cookie
    .split(";")
    .find((cookie) => cookie.indexOf("banner=") === 1);
  const [isRendered, setIsRendered] = useState(banner ? true : false);
  return (
    <motion.div
      layout
      transition={{
        type: "spring",
        ease: "linear",
        duration: 1,
      }}
      layoutId="main-bg"
      className={`
        mt-14
        m-auto
        bg-orange-100
        flex
        items-center
        justify-center
        relative
        overflow-hidden
        ${
          isRendered
            ? "rounded-2xl w-[90%] h-[65vh] cursor-default"
            : "rounded-none w-full h-[80vh] cursor-pointer"
        }
      `}
      onClick={() => {
        document.cookie = "banner=false";
        setIsRendered(true);
      }}
    >
      <div className="flex flex-1 justify-center opacity-75 w-full">
        <Image src={bg} alt="bg" fill />
      </div>
      <div className="flex w-full gap-4 flex-col justify-center items-center text-center text-neutral-100 ">
        <div className="overflow-hidden">
          <motion.h1
            className={`text-3xl delay-1000 duration-500 transition ${
              isRendered
                ? "rotate-0 translate-y-[0%]"
                : "rotate-12 translate-y-[150%]"
            }`}
          >
            Jeong's market
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <h2
            className={`transition duration-500 delay-[1.2s] text-xl ${
              isRendered
                ? "rotate-0 translate-y-[0%]"
                : "rotate-12 translate-y-[150%]"
            }`}
          >
            Near by you
          </h2>
        </div>
        <div className="overflow-hidden">
          <h3
            className={`transition duration-500 delay-[1.2s] ${
              isRendered
                ? "rotate-0 translate-y-[0%]"
                : "rotate-12 translate-y-[200%]"
            }`}
          >
            Make your transaction nearby you
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
