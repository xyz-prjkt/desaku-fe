import { Select } from 'antd';
import { BaseSyntheticEvent, useCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { ISelectInputProps } from './interfaces';

const SelectInput = ({
  extraOnChange,
  fullWidth,
  name = '',
  label,
  maxCount,
  mode,
  suffixIcon,
  options,
  isRequired,
  ...rest
}: ISelectInputProps) => {
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
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <div className="text-xs mb-2">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </div>
      )}
      <Select
        {...rest}
        mode={mode}
        maxCount={maxCount}
        key={field.name}
        ref={field.ref}
        onBlur={field.onBlur}
        value={field.value}
        style={{ width: '100%' }}
        onChange={handleCustomChange}
        suffixIcon={suffixIcon}
        placeholder="Please select"
        options={options}
        status={error ? 'error' : ''}
      />
      {error && <div className="text-xs text-red-500">{error.message}</div>}
    </div>
  );
};

export default SelectInput;
