import React from "react";
import { UseFormRegister, FieldError, UseFormSetFocus } from "react-hook-form";

interface SelectProps<T> {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  register: UseFormRegister<any>;
  setFocus?: UseFormSetFocus<any>;
  error?: FieldError;
}

const Select = <T,>({
  id,
  label,
  options,
  register,
  setFocus,
  error,
}: SelectProps<T>) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label} <span className="text-red-600">*</span>
      </label>
      <select
        id={id}
        {...register(id)}
        onFocus={() => setFocus && setFocus(id)}
        className={`bg-gray-50 border ${
          error ? "border-red-500" : "border-gray-300"
        } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default Select;
