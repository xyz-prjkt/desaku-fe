import { SelectInput } from "@/components/atoms/select";
import { ISelectInputProps } from "@/components/atoms/select/interfaces";

const SKStatusSelectInput = ({ ...props }: ISelectInputProps) => {
  const options = [
    { label: "Approved", value: "APPROVED" },
    { label: "Rejected", value: "REJECTED" },
    { label: "Revised", value: "REVISED" },
    { label: "Pending", value: "PENDING" },
  ];
  return <SelectInput options={options} fullWidth {...props} />;
};

export default SKStatusSelectInput;
