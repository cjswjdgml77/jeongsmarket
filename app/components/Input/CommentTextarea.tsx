import React, { RefObject } from "react";

type Props = {
  textref: RefObject<HTMLTextAreaElement>;
  disabled?: boolean;
};

const CommentTextarea = ({ textref, disabled }: Props) => {
  return (
    <>
      <textarea
        className="
    w-full
    h-[10vh]
    outline-none
    rounded-md
    border-[1.5px]
    resize-none
    p-3
    "
        disabled={disabled}
        ref={textref}
      ></textarea>
    </>
  );
};

export default CommentTextarea;
