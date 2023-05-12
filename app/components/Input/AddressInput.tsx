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
        language="en-US"
        className="py-2 px-3 border-[1px] rounded-lg"
        style={{ width: "100%", outline: "none" }}
        onPlaceSelected={(place) => {
          const idx = place.formatted_address.indexOf(", Australia");
          let address = place.formatted_address as string;
          if (idx !== -1) {
            address = address.slice(0, idx);
          }
          setValue("address", address);
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
