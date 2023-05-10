"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import { AiOutlineUser } from "react-icons/ai";

type Props = {
  user: User;
  address: string;
};

const User = ({ user, address }: Props) => {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-full bg-slate-200 min-w-[2rem] min-h-[2rem] inline-block relative overflow-hidden">
        {user.image ? (
          <Image src={user.image} alt="User Image" fill />
        ) : (
          <AiOutlineUser fill={"#8e8c8c"} className="w-full h-full" />
        )}
      </div>
      <div>
        <div>{user.name}</div>
        <div className="font-light text-sm text-neutral-400">{address}</div>
      </div>
    </div>
  );
};

export default User;
