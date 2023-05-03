"use client";
import { useRef } from "react";
import Container from "../components/Container";
import Logo from "../components/nav/Logo";
import UserAgent from "../components/nav/UserAgent";
import axios from "axios";

type Props = {};

const Nav = (props: Props) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  return (
    <div className="fixed w-full flex p-3">
      <Container>
        <div className="flex justify-between">
          <Logo />
          <UserAgent />
          <textarea className="w-full h-screen" ref={ref}></textarea>
          <button
            onClick={() => {
              if (!ref.current) return null;
              axios.post("/api/test", { data: ref.current.value });
            }}
          >
            send
          </button>
        </div>
      </Container>
    </div>
  );
};

export default Nav;
