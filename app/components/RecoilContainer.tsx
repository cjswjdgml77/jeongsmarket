"use client";

import { RecoilRoot } from "recoil";

import React from "react";
import { ToastContainer } from "react-toastify";

type Props = {
  children: React.ReactNode;
};

const RecoilContainer = ({ children }: Props) => {
  return (
    <RecoilRoot>
      {children}
      <ToastContainer />
    </RecoilRoot>
  );
};

export default RecoilContainer;
