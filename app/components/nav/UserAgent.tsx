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
import useAddItemModal from "@/app/hooks/useAddItemModal";
import { useRouter } from "next/navigation";
type Props = {
  currentUser?: User | null;
};

const UserAgent = ({ currentUser }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const addItemModal = useAddItemModal();
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
            <Image
              src={currentUser.image}
              width={100}
              height={100}
              className="w-full h-full"
              alt="UserImage"
            />
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
          right-0
          flex
          flex-col
          w-auto
          border-[2px]
          rounded-lg
          shadow-md
          bg-white
         "
        >
          {currentUser ? (
            <div className="flex justify-center flex-col">
              <div className="px-6 py-4">
                <div>{currentUser.name}</div>
                <div className="text-sm text-neutral-500">
                  {currentUser.email}
                </div>
              </div>
              <hr className="w-3/4 m-auto" />
              <MenuItem label="Add my item" onClick={addItemModal.onOpen} />
              <MenuItem
                label="My items"
                onClick={() => {
                  router.push("/myitem");
                }}
              />
              <hr className="w-3/4 m-auto" />
              <div></div>
              <MenuItem label="Logout" onClick={signOut} />
            </div>
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
