import { DatePicker as BaseDatePicker } from 'antd';
import { useCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { IDatePickerProps } from './interfaces';

const DatePicker = ({
  name = '',
  label,
  fullWidth,
  onChange,
  ...rest
}: IDatePickerProps) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  const { error } = fieldState;

  const handleCustomChange = useCallback(
    (_: unknown, dateStrings: string | string[]) => onChange(_, dateStrings),
    [onChange]
  );
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && <div className="text-xs mb-2">{label}</div>}
      <BaseDatePicker
        {...rest}
        className={fullWidth ? 'w-full' : ''}
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

export { DatePicker };
