import React from "react";
import { Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";

interface SKSignatureProps {
  date: string;
  title?: string;
  position?: string;
  name?: string;
}

const SKSignature: React.FC<SKSignatureProps> = ({
  date,
  title = "Mengetahui",
  position = "Kepala Desa Jangur",
  name = "LOTVI",
}) => {
  return (
    <View style={{ alignItems: "flex-end", marginBottom: 60 }}>
      <Text style={{ fontSize: 12, marginBottom: 5 }}>
        {format(new Date(date), "dd MMMM yyyy")}
      </Text>
      <Text style={{ fontSize: 12, marginBottom: 5 }}>{title}</Text>
      <Text style={{ fontSize: 12, marginBottom: 60 }}>{position}</Text>
      <Text style={{ fontSize: 12, fontWeight: "bold" }}>{name}</Text>
    </View>
  );
};

export default SKSignature;
