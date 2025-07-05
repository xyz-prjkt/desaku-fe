import { SwitchProps } from 'antd';

export interface ISwitchInputProps extends SwitchProps {
  returnAsInteger?: boolean;
  name: string;
  label?: string;
}
