import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
type Props = {};

const Menubar = (props: Props) => {
  return (
    <div className="hidden">
      <AiOutlineMenu size={26} />
    </div>
  );
};

export default Menubar;
