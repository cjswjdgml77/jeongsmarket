"use client";
import { useRef } from "react";
import Container from "../components/Container";
import Logo from "../components/nav/Logo";
import UserAgent from "../components/nav/UserAgent";
import axios from "axios";
import { User } from "@prisma/client";

type Props = {
  currentUser?: User | null;
};

const Nav = ({ currentUser }: Props) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  return (
    <div className="fixed w-full flex p-3 top-0 z-50 bg-white">
      <Container>
        <div className="flex justify-between">
          <Logo />
          <UserAgent currentUser={currentUser} />
        </div>
      </Container>
    </div>
  );
};

export default Nav;
