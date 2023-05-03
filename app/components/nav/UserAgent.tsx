import React from "react";
import { FaRegUser } from "react-icons/fa";
import Menubar from "./Menubar";
type Props = {};

const UserAgent = (props: Props) => {
  return (
    <div className="flex items-center gap-3">
      <FaRegUser size={20} />
      <Menubar />
    </div>
  );
};

export default UserAgent;
