"use client";
import React, { useCallback, useMemo, useState } from "react";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import Heading from "../Heading";
import * as yup from "yup";
import useAddItemModal from "@/app/hooks/useAddItemModal";
import AddressInput from "../Input/AddressInput";
import { yupResolver } from "@hookform/resolvers/yup";
import CategoryContainer from "../Input/CategoryContainer";
import Input from "../Input/Input";
import TextArea from "../Input/TextArea";
import { toast } from "react-toastify";
import ImageUploader from "../Input/ImageUploader";
import axios from "axios";

type Props = {};
enum ADD_ITEM_STEPS {
  LOCATION = 1,
  CATEGORY,
  CONTENT,
  IMAGES,
  PRICE,
}
const schema = yup.object({
  address: yup.string().required(),
  category: yup.array().min(1).required(),
  title: yup.string().min(3).required(),
  description: yup.string().min(3).required(),
  images: yup.array().min(1).required(),
  price: yup.string().required(),
});
const AddItemModal = (props: Props) => {
  const [steps, setSteps] = useState<ADD_ITEM_STEPS>(ADD_ITEM_STEPS.LOCATION);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    trigger,
    watch,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const address = watch("address");
  const category = watch("category");
  const title = watch("title");
  const description = watch("description");
  const images = watch("images");
  const price = watch("price");

  const addItemModal = useAddItemModal();

  //summit
  const summitHandler = useCallback(async (data: any) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/item", data);
      if (response.status === 200) {
        addItemModal.onClose();
        reset();
        toast.success("Your item is added!", { position: "top-center" });
      }
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
  }, []);

  //prev button
  const bottomLeftBtn = useMemo(() => {
    if (steps === ADD_ITEM_STEPS.LOCATION) {
      return false;
    }
    if (steps === ADD_ITEM_STEPS.PRICE) return false;

    return true;
  }, [steps]);
  const bottomLeftAction = useCallback(() => {
    if (steps === ADD_ITEM_STEPS.LOCATION) return;
    setSteps((value) => value - 1);
  }, [steps]);

  //next button
  const bottomRightBtn = useMemo(() => {
    return true;
  }, [steps]);
  const bottomRightAction = useCallback(async () => {
    if (steps == ADD_ITEM_STEPS.LOCATION) {
      const result = await trigger("address");
      if (!result) return;
    }
    if (steps === ADD_ITEM_STEPS.CATEGORY) {
      const result = await trigger("category");
      if (!result) return;
    }
    if (steps === ADD_ITEM_STEPS.CONTENT) {
      const title = trigger("title");
      const description = trigger("description");
      const result = await Promise.all([title, description])
        .then((data) => {
          if (data.includes(false)) {
            return false;
          }
          return true;
        })
        .catch((error) => {
          toast.error("Something went wrong", { position: "top-center" });
        });
      if (!result) return;
    }
    if (steps === ADD_ITEM_STEPS.IMAGES) {
      const images = await trigger("images");
      if (!images) return;
    }
    if (steps === ADD_ITEM_STEPS.PRICE) {
      const price = await trigger("price");
      if (price) handleSubmit(summitHandler)();
      return;
    }
    setSteps((value) => value + 1);
  }, [steps, trigger, handleSubmit, summitHandler]);
  let header = (
    <Heading
      title="Where is your location"
      subtitle="So, customer can know your location"
      center
    />
  );
  let bodyContent = (
    <div className="mt-5">
      <AddressInput
        id="address"
        watch={address}
        setValue={setValue}
        register={register}
        error={errors?.address?.message as string}
      />
    </div>
  );
  if (steps === ADD_ITEM_STEPS.CATEGORY) {
    header = (
      <Heading
        center
        title="Category"
        subtitle="Please choose your item category"
      />
    );
    bodyContent = (
      <CategoryContainer
        id="category"
        watch={category}
        register={register}
        setValue={setValue}
        error={errors?.category?.message as string}
      />
    );
  }

  if (steps === ADD_ITEM_STEPS.CONTENT) {
    header = (
      <Heading
        center
        title="Write about your item"
        subtitle="Add every details about your itme"
      />
    );
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Input id="title" label="Title" register={register} errors={errors} />
        <TextArea
          id="description"
          register={register}
          outline
          errors={errors}
        />
      </div>
    );
  }
  if (steps === ADD_ITEM_STEPS.IMAGES) {
    header = <Heading center title="Add your photos of your items" />;
    bodyContent = (
      <>
        <ImageUploader watch={images} setValue={setValue} errors={errors} />
      </>
    );
  }
  if (steps === ADD_ITEM_STEPS.PRICE) {
    header = <Heading center title="Add your price for your items" />;
    bodyContent = (
      <div className="my-4">
        <Input
          id="price"
          type="number"
          register={register}
          label="Price"
          price
          errors={errors}
        />
      </div>
    );
  }
  return (
    <Modal
      header={header}
      body={bodyContent}
      isOpen={addItemModal.isOpen}
      onClose={addItemModal.onClose}
      disabled={isLoading}
      bottomLeftBtn={bottomLeftBtn}
      bottomRightBtn={bottomRightBtn}
      bottomLeftBtnLabel={"Prev"}
      bottomRightBtnLabel={"Next"}
      bottomLeftAction={bottomLeftAction}
      bottomRightAction={bottomRightAction}
    />
  );
};

export default AddItemModal;
