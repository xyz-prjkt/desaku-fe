import { SelectInput } from "@/components/atoms/select";
import { ISelectInputProps } from "@/components/atoms/select/interfaces";

const MaritalStatusSelectInput = ({ ...props }: ISelectInputProps) => {
  const maritalStatusOptions = [
    { label: "Belum Menikah", value: "SINGLE" },
    { label: "Menikah", value: "MARRIED" },
    { label: "Bercerai", value: "DIVORCED" },
    { label: "Janda/Duda", value: "WIDOWED" },
  ];
  return <SelectInput options={maritalStatusOptions} fullWidth {...props} />;
};

export default MaritalStatusSelectInput;
