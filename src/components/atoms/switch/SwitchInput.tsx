import { Switch } from 'antd';
import { useCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { ISwitchInputProps } from './interfaces';

const SwitchInput = ({
  name = '',
  className,
  label,
  returnAsInteger,
  ...rest
}: ISwitchInputProps) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  const { error } = fieldState;
  const handleCustomChange = useCallback(
    (checked: boolean) => {
      if (returnAsInteger) {
        field.onChange(checked ? 1 : 0);
      } else {
        field.onChange(checked);
      }
    },
    [field, returnAsInteger]
  );
  return (
    <div className="w-fit">
      {label && <div className="text-xs mb-2">{label}</div>}
      <Switch
        {...rest}
        className="min-w-24"
        key={field.name}
        ref={field.ref}
        value={field.value}
        onChange={handleCustomChange}
      />
      {error && <div className="text-xs text-red-500">{error.message}</div>}
    </div>
  );
};

export default SwitchInput;
