import React from "react";
import { IconType } from "react-icons";

type Props = {
  label: string;
  onClick: () => void;
  icon?: IconType;
  outline?: boolean;
  rounded?: boolean;
  bg?: boolean;
  disabled?: boolean;
};

const Button = ({
  icon: Icon,
  label,
  outline,
  rounded,
  onClick,
  disabled,
  bg,
}: Props) => {
  return (
    <div
      className={`
      flex
      justify-center
      items-center
      gap-3
      py-3
      group
      active:opacity-80
      ${disabled ? "pointer-events-none" : "cursor-pointer"}
      ${outline ? "border-[1px] border-black" : ""}
      ${rounded && "rounded-md"}
      ${bg && "bg-orange-400"}
    `}
      onClick={onClick}
    >
      {Icon && <Icon size={20} />}
      <div className="">{label}</div>
    </div>
  );
};

export default Button;
