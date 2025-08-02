import { DatePickerProps } from "antd/es/date-picker";

interface IDatePickerProps extends DatePickerProps {
  label: string;
  fullWidth?: boolean;
  isRequired?: boolean;
}

export { IDatePickerProps };
