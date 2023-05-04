"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, UseFormReset } from "react-hook-form";
import { GrFormClose } from "react-icons/gr";
type Props = {
  isOpen: boolean;
  onClose: () => void;
  header?: React.ReactElement;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  reset?: UseFormReset<FieldValues>;
};

const Modal = ({ isOpen, onClose, header, body, footer, reset }: Props) => {
  const [showModal, setShowMOdal] = useState(isOpen);

  useEffect(() => {
    setShowMOdal(isOpen);
  }, [isOpen]);

  const closeHandler = useCallback(() => {
    setShowMOdal(false);
    setTimeout(() => {
      if (reset) reset();
      onClose();
    }, 300);
  }, [onClose, reset]);
  if (!isOpen) return null;
  return (
    <div className="bg-neutral-800/70 fixed w-full h-screen z-20 flex items-center">
      <div
        className={`w-full translate-y-0 ${
          !showModal && "transition duration-300 -translate-y-1/2 opacity-0"
        }`}
      >
        <motion.div
          initial={{ y: 600 }}
          animate={{ y: [600, 150, 0], opacity: [1, 0, 0, 0, 1] }}
          className={`
          relative
          w-full
          sm:w-1/2
          lg:w-[30%]
          mx-auto
          rounded-lg
          border-[1px]
          px-2
          sm:px-4
          py-4
          sm:py-6
          bg-white
        `}
        >
          <div className="absolute right-4 top-3" onClick={closeHandler}>
            <GrFormClose size={30} className="cursor-pointer" />
          </div>
          {header}

          <hr />
          <div className="flex-auto">{body}</div>
          <div className="flex-auto">{footer}</div>
        </motion.div>
      </div>
    </div>
  );
};

export default Modal;
