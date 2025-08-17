import { MaritalStatus } from "@/interfaces/services/sk-tidak-mampu";

interface MaritalStatusLabelProps {
  status: MaritalStatus;
}

const MaritalStatusLabel = ({ status }: MaritalStatusLabelProps) => {
  const statusMap = {
    SINGLE: "Belum Menikah",
    MARRIED: "Menikah",
    DIVORCED: "Bercerai",
    WIDOWED: "Janda/Duda",
  };
  return statusMap[status as keyof typeof statusMap] || status;
};

export default MaritalStatusLabel;
