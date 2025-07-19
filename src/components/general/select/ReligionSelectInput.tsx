import { SelectInput } from "@/components/atoms/select";
import { ISelectInputProps } from "@/components/atoms/select/interfaces";

const ReligionSelectInput = ({ ...props }: ISelectInputProps) => {
  const religionOptions = [
    { label: "Islam", value: "Islam" },
    { label: "Kristen", value: "Kristen" },
    { label: "Katolik", value: "Katolik" },
    { label: "Hindu", value: "Hindu" },
    { label: "Buddha", value: "Buddha" },
    { label: "Konghucu", value: "Konghucu" },
  ];
  return <SelectInput options={religionOptions} fullWidth {...props} />;
};

export default ReligionSelectInput;
