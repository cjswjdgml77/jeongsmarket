"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import { AiOutlineUser } from "react-icons/ai";
import TimeAgo from "react-timeago";
type Props = {
  user: User;
  address: string;
  createdAt: Date;
};

const User = ({ user, address, createdAt }: Props) => {
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
        <div className="flex gap-2 items-center">
          <div>{user.name}</div>
          <TimeAgo date={createdAt} className="text-xs text-neutral-400" />
        </div>
        <div className="font-light text-sm text-neutral-400">{address}</div>
      </div>
    </div>
  );
};

export default User;
