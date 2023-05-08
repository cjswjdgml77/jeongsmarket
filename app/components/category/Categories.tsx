"use client";
import { category } from "../Input/CategoryContainer";

type Props = {};

const Categories = (props: Props) => {
  const categories = category;
  console.log(categories);
  return (
    <div className="flex py-5 flex-col gap-5 w-full items-center">
      <div className="w-full text-center text-xl">Category</div>
      <div className="flex w-full xl:justify-center gap-10 overflow-x-auto">
        {categories &&
          categories.length > 0 &&
          categories.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="relative flex flex-col items-center justify-center"
            >
              <Icon size={30} />
              <div>{label}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Categories;
