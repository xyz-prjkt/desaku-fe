import { formatGender } from "@/constants/gender";
import { formatMaritalStatus } from "@/constants/marital-status";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";
import React from "react";
import SKFooter from "./components/SKFooter";
import SKHeader from "./components/SKHeader";
import SKSignature from "./components/SKSignature";

interface SKUsahaTemplateProps {
  data: ISuratKeterangan;
  qrCodeValue: string;
}

const SKUsahaTemplate: React.FC<SKUsahaTemplateProps> = ({
  data,
  qrCodeValue,
}) => {
  const skUsaha = data.sk_usaha;

  if (!skUsaha) return null;

  return (
    <Document>
      <Page size="A4" style={{ fontFamily: "Times-Roman", padding: 40 }}>
        {/* Header */}
        <SKHeader />

        {/* Title */}
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 5,
            textDecoration: "underline",
          }}
        >
          SURAT KETERANGAN USAHA
        </Text>

        <Text style={{ fontSize: 12, textAlign: "center", marginBottom: 20 }}>
          Nomor: {data.id}
        </Text>

        {/* Opening Statement */}
        <Text
          style={{
            fontSize: 12,
            textAlign: "justify",
            marginBottom: 20,
            lineHeight: 1.5,
          }}
        >
          Yang bertanda tangan di bawah ini Kepala Desa Jangur, Kecamatan
          Sumberasih, Kabupaten Probolinggo, Menerangkan dengan sebenarnya
          bahwa:
        </Text>

        {/* Personal Data */}
        <View style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Nama</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>
              {skUsaha.name}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>
              Tempat / Tanggal Lahir
            </Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>
              {skUsaha.born_place},{" "}
              {format(new Date(skUsaha.born_birth), "dd MMMM yyyy")}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Jenis Kelamin</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>{formatGender(skUsaha.gender)}</Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Status Perkawinan</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>
              {formatMaritalStatus(skUsaha.marital_status)}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Agama</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>{skUsaha.religion}</Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Pekerjaan</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>{skUsaha.work}</Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Alamat</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>{skUsaha.address}</Text>
          </View>
        </View>

        {/* Statement */}
        <Text
          style={{
            fontSize: 12,
            textAlign: "justify",
            marginBottom: 20,
            lineHeight: 1.5,
          }}
        >
          Orang tersebut diatas adalah benar-benar penduduk Desa Jangur yang
          mempunyai usaha {skUsaha.bussiness} yang terletak di Desa Jangur
          Kabupaten Probolinggo. Surat keterangan ini dibuat untuk persyaratan
          pinjaman di BANK.
        </Text>

        <Text
          style={{
            fontSize: 12,
            textAlign: "justify",
            marginBottom: 40,
            lineHeight: 1.5,
          }}
        >
          Demikian surat keterangan ini kami buat dengan sebenarnya dan dapat
          dipergunakan sebagai mana mestinya.
        </Text>

        {/* Signature */}
        <SKSignature date={data.createdAt} />

        <SKFooter qrCodeValue={qrCodeValue} />
      </Page>
    </Document>
  );
};

export default SKUsahaTemplate;
