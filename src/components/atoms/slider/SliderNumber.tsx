import { Col, InputNumber, Row, Slider } from 'antd';
import { ISliderProps } from './interfaces';
import { useController, useFormContext } from 'react-hook-form';
import { useCallback } from 'react';

const SliderNumber = ({
  name,
  label,
  prefix,
  suffix,
  ...props
}: ISliderProps) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  const { error } = fieldState;

  const onChange = useCallback(
    (input: number | null) => {
      field.onChange(input ?? 0);
    },
    [field]
  );
  return (
    <Col>
      {label && <div className="text-xs">{label}</div>}
      <Row>
        <Col className="w-3/4">
          <Slider
            onChange={onChange}
            value={typeof field.value === 'number' ? field.value : 0}
            {...props}
          />
        </Col>
        <Col className="w-1/4">
          <InputNumber
            style={{ margin: '0 16px' }}
            min={props.min}
            max={props.max}
            value={field.value}
            onChange={onChange}
            defaultValue={props.defaultValue}
            suffix={suffix}
            prefix={prefix}
          />
        </Col>
      </Row>
      {error && <div className="text-xs text-red-500">{error.message}</div>}
    </Col>
  );
};

export default SliderNumber;
