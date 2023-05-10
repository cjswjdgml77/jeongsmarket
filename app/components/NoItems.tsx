import React from "react";

type Props = {
  label?: string;
  center?: boolean;
};

const NoItems = ({ label = "No Items", center }: Props) => {
  return (
    <div className={`w-full py-5 ${center && "text-center"} text-lg`}>
      {label}
    </div>
  );
};

export default NoItems;
