"use client";
import useLoginModal from "@/app/hooks/useLoginModal";
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
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Props = {};
const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();
const LoginModal = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const loginModal = useLoginModal();
  const {
    register,
    handleSubmit,
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
      const response = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (response?.ok) {
        toast.success("Login successful", { position: "top-center" });
        loginModal.onClose();
        router.refresh();
      }
      if (response?.error) {
        toast.error(response.error, { position: "top-right" });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const header = <Heading title="Login" center subtitle="" />;
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
        id="password"
        type="password"
        label="Password"
        register={register}
        disabled={isLoading}
        errors={errors}
      />
      <div>
        <Button
          label="Continue"
          rounded
          disabled={isLoading}
          onClick={() => handleSubmit(onSubmit)()}
          bg="bg-orange-500"
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
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      header={header}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
