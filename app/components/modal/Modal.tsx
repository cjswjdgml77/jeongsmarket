"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, UseFormReset } from "react-hook-form";
import { GrFormClose } from "react-icons/gr";
import Button from "../button/Button";
type Props = {
  isOpen: boolean;
  onClose: () => void;
  header?: React.ReactElement;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  reset?: UseFormReset<FieldValues>;
  disabled?: boolean;
  bottomLeftBtn?: boolean;
  bottomLeftBtnLabel?: string;
  bottomLeftAction?: () => void;
  bottomRightBtn?: boolean;
  bottomRightBtnLabel?: string;
  bottomRightAction?: () => void;
};

const Modal = ({
  isOpen,
  onClose,
  header,
  body,
  footer,
  reset,
  bottomLeftBtn,
  bottomLeftBtnLabel,
  bottomRightBtn,
  bottomRightBtnLabel,
  bottomLeftAction,
  bottomRightAction,
  disabled,
}: Props) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const closeHandler = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
      if (reset) reset();
    }, 300);
  }, [onClose, reset]);
  if (!isOpen) return null;
  return (
    <div className="bg-neutral-800/70 fixed top-0 w-full h-screen z-20 flex items-center">
      <div
        className={`
        w-full transition duration-300
        ${showModal ? "translate-y-0" : "-translate-y-[50%] opacity-0"}
        `}
      >
        <motion.div
          initial={{ y: 600 }}
          animate={{ y: [600, 150, 0], opacity: [1, 0, 0, 0, 1] }}
          className={`
          relative
          inset-0
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
          <div className="flex mt-6 gap-3">
            {bottomLeftBtn && bottomLeftBtnLabel && bottomLeftAction && (
              <Button
                label={bottomLeftBtnLabel}
                disabled={disabled}
                rounded
                outline
                onClick={bottomLeftAction}
              />
            )}
            {bottomRightBtn && bottomRightBtnLabel && bottomRightAction && (
              <Button
                label={bottomRightBtnLabel}
                disabled={disabled}
                rounded
                bg="bg-orange-500"
                onClick={bottomRightAction}
              />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Modal;
