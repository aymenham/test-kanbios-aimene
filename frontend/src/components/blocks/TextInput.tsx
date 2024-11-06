import React from "react";
import {
  FieldError,
  UseFormRegister,
  Path,
  UseFormSetFocus,
  FieldValues,
} from "react-hook-form";

interface TextInputProps<T extends FieldValues> {
  id: string;
  label: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  setFocus?: UseFormSetFocus<T>;
  validation: object;
  error?: FieldError;
  type?: string;
}

const TextInput = <T,>({
  id,
  label,
  placeholder = "",
  register,
  setFocus,
  validation,
  error,
  type,
}: TextInputProps<any>) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label} <span className="text-red-600">*</span>
      </label>
      <input
        type={type ?? "text"}
        id={id}
        {...register(id as Path<T>, validation)}
        className={`bg-gray-50 border ${
          error ? "border-red-500" : "border-gray-300"
        } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        placeholder={placeholder}
        onFocus={() => setFocus && setFocus(id as Path<T>)}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default TextInput;
