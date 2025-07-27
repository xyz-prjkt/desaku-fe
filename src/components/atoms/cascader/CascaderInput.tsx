import { Cascader } from "antd";
import { DefaultOptionType } from "antd/es/cascader";
import { useCallback } from "react";
import { useController, useFormContext } from "react-hook-form";
import { ICascaderInputProps } from "./interfaces/cascader-input.interface";

const CascaderInput = ({
  extraOnChange,
  name = "",
  label,
  showSearch,
  showCheckedStrategy,
  options,
  inline,
  required,
  disabled,
}: ICascaderInputProps) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name,
    control,
    defaultValue: [],
  });
  const { error } = fieldState;

  const handleCustomChange = useCallback(
    (
      value: (string | number | null)[][],
      selectOptions: DefaultOptionType[]
    ) => {
      field.onChange(value);
      if (extraOnChange) {
        extraOnChange(value, selectOptions);
      }
    },
    [field, extraOnChange]
  );

  return (
    <div>
      {label && (
        <div className="text-xs mb-2">
          {required && <span className="text-red-500">* </span>}
          {label}
        </div>
      )}
      {inline ? (
        <Cascader.Panel
          className="w-full"
          options={options}
          onChange={handleCustomChange}
          value={field.value || []}
          multiple
          showCheckedStrategy={"SHOW_CHILD"}
          disabled={disabled}
        />
      ) : (
        <Cascader
          className="w-full"
          showSearch={showSearch}
          options={options}
          onChange={handleCustomChange}
          value={field.value || []}
          multiple
          showCheckedStrategy={showCheckedStrategy}
          disabled={disabled}
        />
      )}
      {error && <div className="text-xs text-red-500">{error.message}</div>}
    </div>
  );
};

export default CascaderInput;
