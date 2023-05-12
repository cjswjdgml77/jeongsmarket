"use client";

import { useCallback } from "react";
import { IconType } from "react-icons";

type Props = {
  label: string;
  icon: IconType;
  onSelect: ([]) => void;
  selected: string[];
};

const CategoryCard = ({ label, icon: Icon, onSelect, selected }: Props) => {
  const clickHandler = useCallback(() => {
    const isHave = selected.includes(label);
    if (isHave) {
      onSelect(selected.filter((item) => item !== label));
    } else {
      if (selected.length > 3) {
        return;
      }
      onSelect([...selected, label]);
    }
  }, [onSelect, selected, label]);
  return (
    <div
      className={`
        flex
        col-span-1
        gap-2
        items-center
        border-[1px]
        rounded-lg
        px-2
        py-4
        ${!selected.includes(label) && "hover:bg-slate-100"}
        cursor-pointer
        ${selected.includes(label) && "bg-slate-400"}
      `}
      onClick={clickHandler}
    >
      {Icon && <Icon size={25} />}
      <p>{label}</p>
    </div>
  );
};

export default CategoryCard;
