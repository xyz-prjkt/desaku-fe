import { Image, Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";
import React from "react";

interface SKSignatureProps {
  date: string;
  qrCodeValue?: string;
  title?: string;
  position?: string;
  name?: string;
}

const SKSignature: React.FC<SKSignatureProps> = ({
  qrCodeValue,
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
      <Text style={{ fontSize: 12 }}>{position}</Text>
      <View
        style={{
          width: 45,
          height: 45,
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <Image src={qrCodeValue} style={{ width: 45, height: 45 }} />
      </View>
      <Text style={{ fontSize: 12, fontWeight: "bold" }}>{name}</Text>
    </View>
  );
};

export default SKSignature;
