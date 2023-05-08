/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useCallback, useState } from "react";
import { FieldErrors, FieldValues, UseFormSetValue } from "react-hook-form";
import { IoCloseOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import axios from "axios";
import ImageCard from "../imageUploader/ImageCard";
import { AiOutlineLoading } from "react-icons/ai";
import Button from "../button/Button";

type Props = {
  setValue: UseFormSetValue<FieldValues>;
  watch: imageData[];
  errors?: FieldErrors<FieldValues>;
};

type Preview = {
  file: Blob[] | null;
  src: string | null;
};
export type imageData = {
  filename: string;
  public_id: string;
  secure_url: string;
};

const ImageUploader = ({ setValue, watch, errors }: Props) => {
  const [preview, setPreview] = useState<Preview>({ file: null, src: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const doneBtnHandler = useCallback(async () => {
    if (!preview.file) return;
    setIsLoading(true);
    try {
      const formData = new FormData();
      const { file } = preview;
      formData.append("file", file[0]);
      formData.append("upload_preset", "rk8ycoam");
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dieondzh2/image/upload`,
        formData
      );
      if (response?.status === 200) {
        setPreview({ file: null, src: "" });
        if (!watch)
          setValue("images", [
            {
              filename: `${response.data.original_filename}.${response.data.format}`,
              public_id: response.data.public_id,
              secure_url: response.data.secure_url,
            },
          ]);
        else {
          setValue("images", [
            ...watch,
            {
              filename: `${response.data.original_filename}.${response.data.format}`,
              public_id: response.data.public_id,
              secure_url: response.data.secure_url,
            },
          ]);
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, [preview, setPreview, setValue, watch]);
  const onDrop = useCallback((acceptedFile: any) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (e.target?.result) {
        setPreview({ file: acceptedFile, src: e.target.result as string });
      }
    };
    fileReader.readAsDataURL(acceptedFile[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      "image/jpg": [".jpg"],
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
    },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div className="px-4 mt-5">
      {errors && errors["images"]?.message && (
        <span className="px-3 text-red-500 text-sm">
          {errors["images"]?.message as string}
        </span>
      )}
      <div
        className="
                w-full
                min-h-[30vh]
                rounded-lg
                border-dashed
                border-[2px]
                flex
                justify-center
                items-center
                px-3
                py-4
              "
        {...getRootProps()}
      >
        <input
          type="text"
          className="w-[45px] h-[30px] border-[3px]"
          {...getInputProps({ role: "button" })}
        />
        <div className="flex flex-col items-center w-full h-full justify-between overflow-y-auto">
          {preview.src ? (
            <div className="w-2/3 h-full flex flex-col items-center gap-3">
              <div className="relative">
                <Image
                  src={preview.src}
                  className="object-fill w-full h-[full] max-h-[400px] rounded-md"
                  alt="Preview of your Item"
                  width={200}
                  height={200}
                />
                <IoCloseOutline
                  className="absolute top-0 right-0 cursor-pointer"
                  size={20}
                  color={"white"}
                  onClick={() => {
                    setPreview({ file: null, src: "" });
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                {isLoading && <AiOutlineLoading className="animate-spin" />}
                <button
                  className={`py-3 px-4 rounded-md bg-cyan-600 text-white
                  ${!isLoading && "hover:opacity-70"}
                  ${isLoading && "opacity-40"}`}
                  onClick={doneBtnHandler}
                  disabled={isLoading}
                >
                  Done
                </button>
              </div>
            </div>
          ) : watch && watch.length > 0 ? (
            <div className="w-full flex flex-col items-center gap-2 mb-6">
              {watch.map(({ filename, public_id, secure_url }) => (
                <ImageCard
                  key={filename}
                  filename={filename}
                  public_id={public_id}
                  secure_url={secure_url}
                  setValue={setValue}
                  watch={watch}
                  disabled={isLoading}
                  setDisabled={setIsLoading}
                />
              ))}
            </div>
          ) : (
            <>
              <Button
                label="Upload a File"
                onClick={open}
                bg="bg-orange-500"
                rounded
                small
                white
              />
              <p className="text-center mt-6 text-neutral-400 font-thin">
                ...or drag and drop a file.
              </p>
            </>
          )}
          {!preview.src && watch && watch.length > 0 && (
            <Button
              label="add more..."
              small
              onClick={open}
              rounded
              white
              bg="bg-slate-500"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
