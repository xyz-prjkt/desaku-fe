interface MaritalStatusLabelProps {
  status: string;
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
