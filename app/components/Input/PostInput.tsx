import React from "react";

type Props = {
  disabled?: boolean;
  label: string;
};

const PostInput = ({ label, disabled = true }: Props) => {
  return (
    <div>
      <input type="text" className="w-full" value={label} disabled={disabled} />
    </div>
  );
};

export default PostInput;
