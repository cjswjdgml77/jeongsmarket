"use client";
import { useEffect, useState } from "react";
import LoadingPage from "./LoadingPage";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

const MyLoading = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <>{children}</>
      ) : (
        <motion.div key="loader">
          <LoadingPage setIsLoading={setIsLoading} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MyLoading;
