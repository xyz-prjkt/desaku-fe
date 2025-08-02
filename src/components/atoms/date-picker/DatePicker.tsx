import { DatePicker as BaseDatePicker } from "antd";
import dayjs from "dayjs";
import { useController, useFormContext } from "react-hook-form";
import { IDatePickerProps } from "./interfaces";

const DatePicker = ({
  name = "",
  label,
  fullWidth,
  isRequired,
  ...rest
}: IDatePickerProps) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  const { error } = fieldState;

  return (
    <div className={fullWidth ? "w-full" : ""}>
      {label && (
        <div className="text-xs mb-2">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </div>
      )}
      <BaseDatePicker
        {...rest}
        className={fullWidth ? "w-full" : ""}
        status={error && "error"}
        onChange={(date) => {
          if (date) {
            field.onChange(date.toISOString());
          } else {
            field.onChange(null);
          }
        }}
        name={field.name}
        ref={field.ref}
        onBlur={field.onBlur}
        value={field.value ? dayjs(field.value) : null}
      />
      {error && <div className="text-xs text-red-500">{error.message}</div>}
    </div>
  );
};

export { DatePicker };
