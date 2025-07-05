import { BaseSyntheticEvent, useCallback } from 'react';

import { Input } from 'antd';
import { useController, useFormContext } from 'react-hook-form';
import { IPasswordInputProps } from './interfaces';
import clsx from 'clsx';

const PasswordInput = ({
  extraOnChange,
  name = '',
  label,
  fullWidth,
  ...rest
}: IPasswordInputProps) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  const { error } = fieldState;

  const handleCustomChange = useCallback(
    (input: BaseSyntheticEvent) => {
      field.onChange(input);
      if (extraOnChange) {
        extraOnChange(input);
      }
    },
    [field, extraOnChange]
  );
  return (
    <div className={clsx('', fullWidth ? 'w-full' : '')}>
      {label && <div className="text-xs mb-2">{label}</div>}
      <Input.Password
        {...rest}
        status={error && 'error'}
        onChange={handleCustomChange}
        name={field.name}
        ref={field.ref}
        onBlur={field.onBlur}
        value={field.value}
      />
      {error && <div className="text-xs text-red-500">{error.message}</div>}
    </div>
  );
};

export default PasswordInput;
