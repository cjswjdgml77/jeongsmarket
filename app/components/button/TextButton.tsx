import React from "react";

type Props = {
  label: string;
  onClick: () => void;
  big?: boolean;
  marginL?: boolean;
};

const TextButton = ({ label, onClick, big, marginL }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`text-neutral-400 transition hover:text-neutral-600 active:scale-110
      ${big ? "text-lg" : "text-sm"} 
        ${marginL ? "ml-2" : ""}
      `}
    >
      {label}
    </button>
  );
};

export default TextButton;
