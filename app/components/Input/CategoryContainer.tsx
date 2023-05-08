"use client";

import { useEffect, useState } from "react";
import { FaCarAlt } from "react-icons/fa";
import { GiSmartphone } from "react-icons/gi";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { GiClothes, GiWatch, GiLipstick } from "react-icons/gi";
import { TfiGame } from "react-icons/tfi";
import { BiBookAlt } from "react-icons/bi";
import { RxLaptop } from "react-icons/rx";
import { RiCoupon3Line } from "react-icons/ri";
import { CiDumbbell } from "react-icons/ci";
import { TbSofa } from "react-icons/tb";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import CategoryCard from "../category/CategoryCard";
import { AnimatePresence, motion } from "framer-motion";
import ErrorInput from "./ErrorInput";

type Props = {
  id: string;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  watch?: [];
  error?: string;
};
export const category = [
  { label: "Car", icon: FaCarAlt },
  { label: "Phone", icon: GiSmartphone },
  { label: "House", icon: AiOutlineHome },
  { label: "Computer", icon: HiOutlineDesktopComputer },
  { label: "Laptop", icon: RxLaptop },
  { label: "Clothes", icon: GiClothes },
  { label: "Games", icon: TfiGame },
  { label: "Furniture", icon: TbSofa },
  { label: "Jewellery", icon: GiWatch },
  { label: "Book", icon: BiBookAlt },
  { label: "Ticket", icon: RiCoupon3Line },
  { label: "Beauty", icon: GiLipstick },
  { label: "Fitness", icon: CiDumbbell },
];

const CategoryContainer = ({ id, setValue, watch = [], error }: Props) => {
  const [selected, setSelected] = useState<string[]>(watch);
  useEffect(() => {
    setValue("category", selected);
  }, [selected, setValue]);
  return (
    <div className="w-full">
      <div
        className="grid
                    grid-cols-2
                    md:grid-cols-3
                    my-5
                    py-3
                    gap-4
                    "
      >
        <AnimatePresence>
          {selected.length > 0 &&
            selected.map((item) => (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                layout
                key={item}
                className="border-[1px] border-black rounded-full text-center"
              >
                {item}
              </motion.div>
            ))}
        </AnimatePresence>
        {error && selected.length === 0 && <ErrorInput error={error} />}
      </div>
      <div className="grid h-[40vh] grid-cols-1 sm:grid-cols-2 gap-3 transition-[grid] overflow-y-auto">
        {category.map((data) => (
          <CategoryCard
            key={data.label}
            label={data.label}
            icon={data.icon}
            selected={selected}
            onSelect={setSelected}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryContainer;
