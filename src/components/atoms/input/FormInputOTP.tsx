import { useCallback } from 'react';

import { Input } from 'antd';
import { useController, useFormContext } from 'react-hook-form';
import { IFormInputOTPProps } from './interfaces';

const FormInputOTP = ({ name = '', label, length }: IFormInputOTPProps) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  const { error } = fieldState;

  const handleCustomChange = useCallback(
    (input: string) => field.onChange(input),
    [field]
  );
  return (
    <div>
      {label && <div className="text-xs mb-2">{label}</div>}
      <Input.OTP
        length={length}
        status={error && 'error'}
        formatter={(str) => str.toUpperCase()}
        onChange={handleCustomChange}
        ref={field.ref}
        onBlur={field.onBlur}
        value={field.value}
      />
    </div>
  );
};

export default FormInputOTP;
