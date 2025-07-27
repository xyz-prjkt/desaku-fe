import { CascaderProps, DefaultOptionType } from "antd/es/cascader";

export interface ICascaderInputProps extends CascaderProps {
  required?: boolean;
  extraOnChange?: (
    value: (string | number | null)[][],
    selectOptions: DefaultOptionType[]
  ) => void;
  name: string;
  label?: string;
  inline?: boolean;
}
