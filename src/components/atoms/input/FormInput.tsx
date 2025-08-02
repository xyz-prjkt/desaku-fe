import { BaseSyntheticEvent, useCallback } from "react";

import { Input } from "antd";
import { useController, useFormContext } from "react-hook-form";
import { IFormInputProps } from "./interfaces";

const FormInput = ({
  extraOnChange,
  name = "",
  label,
  type,
  isRequired,
  ...rest
}: IFormInputProps) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  const { error } = fieldState;

  const handleCustomChange = useCallback(
    (input: BaseSyntheticEvent) => {
      field.onChange(input);
      if (extraOnChange) {
        extraOnChange(input);
      }
    },
    [field, extraOnChange],
  );
  return (
    <div className="w-full">
      {label && (
        <div className="text-xs mb-2">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </div>
      )}
      <Input
        {...rest}
        status={error && "error"}
        onChange={handleCustomChange}
        type={type}
        name={field.name}
        ref={field.ref}
        onBlur={field.onBlur}
        value={field.value}
      />
      {error && <div className="text-xs text-red-500">{error.message}</div>}
    </div>
  );
};

export default FormInput;
