import React from "react";
import { IconType } from "react-icons";

type Props = {
  label: string;
  onClick: () => void;
  icon?: IconType;
  outline?: boolean;
  rounded?: boolean;
  bg?: string;
  disabled?: boolean;
  small?: boolean;
  white?: boolean;
};

const Button = ({
  icon: Icon,
  label,
  outline,
  rounded,
  onClick,
  disabled,
  small,
  bg,
  white,
}: Props) => {
  console.log(disabled);
  return (
    <div
      className={`
      ${small ? "py-4 px-3 font-light" : "w-full"}
      ${white && "text-white"}
      flex
      justify-center
      items-center
      gap-3
      py-3
      group
      active:opacity-80
      hover:opacity-80
      transition
      ${disabled ? "pointer-events-none opacity-80" : "cursor-pointer"}
      ${outline ? "border-[1px] border-black" : ""}
      ${rounded && "rounded-md"}
      ${bg && bg}
      
    `}
      onClick={onClick}
    >
      {Icon && <Icon size={20} />}
      <div className="">{label}</div>
    </div>
  );
};

export default Button;
