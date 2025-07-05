import { DatePickerProps } from 'antd/es/date-picker';

interface IDatePickerProps extends DatePickerProps {
  onChange: (date: any, dateString: string | string[]) => void;
  label: string;
  fullWidth?: boolean;
}

export { IDatePickerProps };
