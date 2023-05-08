import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  id: string;
  register: UseFormRegister<FieldValues>;
  outline?: boolean;
  errors?: FieldErrors<FieldValues>;
};

const TextArea = ({ outline, register, id, errors }: Props) => {
  return (
    <div className="relative">
      <textarea
        id={id}
        className={`
        w-full
        h-[30vh]
        ${outline && "outline-none"}
        border-[1px]
        rounded-lg
        py-4
        px-3
      `}
        {...register(id)}
      ></textarea>
      {errors && errors[id] && (
        <span className="text-sm px-3 text-red-500">
          {errors[id]?.message as string}
        </span>
      )}
    </div>
  );
};

export default TextArea;
