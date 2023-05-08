"use client";

import { useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import {
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import Autocomplete from "react-google-autocomplete";
import ErrorInput from "./ErrorInput";
type Props = {
  id: string;
  setValue: UseFormSetValue<FieldValues>;
  register: UseFormRegister<FieldValues>;
  error?: string;
  watch?: string;
};

const AddressInput = ({ id, setValue, register, error, watch }: Props) => {
  return (
    <>
      <Autocomplete
        apiKey={"AIzaSyCYnYUfruPL5wSy6SyRGcWTBbXrW529_hM"}
        className="py-2 px-3 border-[1px] rounded-lg"
        style={{ width: "100%", outline: "none" }}
        onPlaceSelected={(place) => {
          // setAddress(place.formatted_address);
          setValue("address", place.formatted_address);
        }}
        defaultValue={watch}
        options={{
          types: ["(regions)"],
          componentRestrictions: { country: "au" },
        }}
        {...register(id)}
      />
      {error && <ErrorInput error={error} />}
    </>
  );
};

export default AddressInput;
