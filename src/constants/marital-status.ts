export const formatMaritalStatus = (status: string) => {
  const statusMap: Record<string, string> = {
    SINGLE: "Belum Kawin",
    MARRIED: "Kawin",
    DIVORCED: "Cerai Hidup",
    WIDOWED: "Cerai Mati",
    SEPARATED: "Pisah",
    SIRI: "Kawin Siri",
  };
  return statusMap[status] || status;
};
