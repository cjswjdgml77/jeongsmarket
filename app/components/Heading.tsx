"use client";
import React from "react";

type Props = {
  title: string;
  subtitle?: string;
  center?: boolean;
};

const Heading = ({ title, subtitle, center }: Props) => {
  return (
    <div className={`flex flex-col gap-2 py-2 ${center && "text-center"}`}>
      <div className="text-xl font-semibold">{title}</div>
      <div className="text-lg font-light text-neutral-500">{subtitle}</div>
    </div>
  );
};

export default Heading;
