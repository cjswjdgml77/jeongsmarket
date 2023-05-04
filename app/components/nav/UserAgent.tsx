"use client";
import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import Menubar from "./Menubar";
import { User } from "@prisma/client";
import Image from "next/image";
import MenuItem from "./MenuItem";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import useRegisterModal from "@/app/hooks/useRegisterModal";
type Props = {
  currentUser?: User | null;
};

const UserAgent = ({ currentUser }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  return (
    <div className="flex items-center gap-3 relative">
      <div
        className="cursor-pointer"
        onClick={() => {
          setIsOpen((value) => !value);
        }}
      >
        {currentUser?.image ? (
          <div className="w-8 h-8 rounded-full relative overflow-hidden">
            <Image src={currentUser.image} fill alt="UserImage" />
          </div>
        ) : (
          <FaRegUser size={20} />
        )}
      </div>
      <Menubar />
      {isOpen && (
        <div
          className="
          absolute
          top-11
          right-5
          flex
          flex-col
          w-auto
          border-[2px]
          rounded-lg
          shadow-md
         "
        >
          {currentUser ? (
            <>
              <MenuItem label="Logout" onClick={signOut} />
            </>
          ) : (
            <>
              <MenuItem label="Login" onClick={loginModal.onOpen} />
              <hr />
              <MenuItem label="Sign up" onClick={registerModal.onOpen} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserAgent;
