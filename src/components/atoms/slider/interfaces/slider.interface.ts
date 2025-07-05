import { SliderSingleProps } from 'antd';

export interface ISliderProps extends SliderSingleProps {
  name: string;
  label?: string;
  prefix?: string;
  suffix?: string;
}
