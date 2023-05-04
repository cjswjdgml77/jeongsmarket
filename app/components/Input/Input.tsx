"use client";
import { motion } from "framer-motion";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
type Props = {
  type?: string;
  id: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors<FieldValues>;
  disabled?: boolean;
};

const Input = ({
  type = "text",
  id,
  label,
  register,
  errors,
  disabled,
}: Props) => {
  return (
    <div className="relative">
      <div className="flex relative border-[1px] rounded-lg px-3">
        <input
          id={id}
          type={type}
          disabled={disabled}
          className="
            w-full
            outline-none
            h-10
            peer
            text-lg
        "
          placeholder=" "
          {...register(id)}
        />
        <motion.label
          layout
          className={`
            absolute
            text-sm
            transition
            top-2
            -translate-y-5
            peer-placeholder-shown:-translate-y-0
            peer-focus:-translate-y-5
            peer-focus:scale-90
            text-neutral-500
            ${errors && errors[id] && "-translate-y-5"}
        `}
          htmlFor={id}
        >
          {label}
        </motion.label>
      </div>
      {errors && errors[id] && (
        <span className="absolute text-sm bottom-0 px-3 text-red-500 mt-3 translate-y-6">
          {errors[id]?.message as string}
        </span>
      )}
    </div>
  );
};

export default Input;
