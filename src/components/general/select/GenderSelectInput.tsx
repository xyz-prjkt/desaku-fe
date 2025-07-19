import { SelectInput } from "@/components/atoms/select";
import { ISelectInputProps } from "@/components/atoms/select/interfaces";

const GenderSelectInput = ({ ...props }: ISelectInputProps) => {
  const genderOptions = [
    { label: "Laki-laki", value: "MALE" },
    { label: "Perempuan", value: "FEMALE" },
  ];
  return <SelectInput options={genderOptions} fullWidth {...props} />;
};

export default GenderSelectInput;
