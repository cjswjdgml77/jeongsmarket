"use client";

import axios from "axios";
import { useCallback } from "react";
import { FcImageFile } from "react-icons/fc";
import cloudinary from "cloudinary";
import { env } from "process";
import { toast } from "react-toastify";
import { FieldValues, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { imageData } from "../Input/ImageUploader";
type Props = {
  filename: string;
  public_id: string;
  secure_url: string;
  setValue: UseFormSetValue<FieldValues>;
  watch: imageData[];
  disabled: boolean;
  setDisabled: (data: boolean) => void;
};

const ImageCard = ({
  filename,
  public_id,
  secure_url,
  setValue,
  watch,
  disabled,
  setDisabled,
}: Props) => {
  const clickHandler = useCallback(async () => {
    try {
      setDisabled(true);
      const response = await axios.delete(`/api/upload/${public_id}`);
      setValue(
        "images",
        watch.filter((item) => item.secure_url !== secure_url)
      );
    } catch (e) {
      toast.error("Internal sever error", { position: "top-center" });
    } finally {
      setDisabled(false);
    }
  }, [watch, setValue, public_id, secure_url, setDisabled]);
  console.log(filename);
  return (
    <div className="flex items-center w-full justify-between max-w-[300px]">
      <div className="flex items-center gap-2 ">
        <FcImageFile />
        <div>{filename}</div>
      </div>
      <button
        className="bg-red-300 rounded-sm py-1 px-1 text-neutral-100 hover:bg-red-400 transition hover:text-white"
        onClick={clickHandler}
        disabled={disabled}
      >
        remove
      </button>
    </div>
  );
};

export default ImageCard;
