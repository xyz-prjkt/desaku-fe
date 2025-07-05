import { SelectProps } from 'antd';
import { BaseSyntheticEvent } from 'react';

export interface ISelectInputProps extends SelectProps {
  extraOnChange?: (event: BaseSyntheticEvent) => void;
  fullWidth?: boolean;
  name: string;
  label?: string;
  isRequired?: boolean;
}
