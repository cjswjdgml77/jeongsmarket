"use client";
import Modal from "./Modal";
import Input from "../Input/Input";
import Button from "../button/Button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Heading from "../Heading";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {};
const schema = yup
  .object({
    email: yup.string().email().required(),
    name: yup.string().min(3).max(20).required(),
    password: yup.string().required(),
  })
  .required();
const RegisterModal = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const registerModal = useRegisterModal();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      await axios.post("/api/register", data);
      toast.success("Account Created!", { position: "top-center" });
      reset();
      registerModal.onClose();
    } catch (error: any) {
      if (error?.response?.statusText) {
        toast.error(error.response.statusText, {
          position: "top-right",
        });
      } else {
        toast.error("Internal server error", { position: "top-right" });
      }
    } finally {
      setIsLoading(false);
    }
  };
  const header = (
    <Heading
      title="Welcome to Jeong's market"
      subtitle="Do you want to sign in ?"
      center
    />
  );
  const bodyContent = (
    <div className="flex py-5 gap-9 flex-col">
      <Input
        id="email"
        label="Email"
        register={register}
        errors={errors}
        disabled={isLoading}
      />
      <Input
        id="name"
        label="Name"
        register={register}
        errors={errors}
        disabled={isLoading}
      />
      <Input
        id="password"
        type="password"
        label="Password"
        register={register}
        errors={errors}
        disabled={isLoading}
      />
      <div>
        <Button
          label="Continue"
          rounded
          onClick={() => {
            handleSubmit(onSubmit)();
          }}
          bg="bg-orange-500"
          disabled={isLoading}
        />
      </div>
    </div>
  );
  const footerContent = (
    <div className="flex flex-col px-3 gap-3 ">
      <div className="flex flex-1 items-center">
        <div className="border-[0.5px] border-neutral-400 flex-1 h-[1px]"></div>
        <div>OR</div>
        <div className="border-[0.5px] border-neutral-400 flex-1 h-[1px]"></div>
      </div>
      <Button
        label="Continue with Google"
        icon={FcGoogle}
        outline
        rounded
        disabled={isLoading}
        onClick={() => {
          signIn("google");
        }}
      />
      <Button
        label="Continue with Github"
        icon={FaGithub}
        outline
        rounded
        disabled={isLoading}
        onClick={() => {
          signIn("github");
        }}
      />
    </div>
  );
  return (
    <Modal
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      header={header}
      body={bodyContent}
      reset={reset}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
