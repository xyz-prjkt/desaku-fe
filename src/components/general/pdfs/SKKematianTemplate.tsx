import { formatGender } from "@/constants/gender";
import { formatMaritalStatus } from "@/constants/marital-status";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";
import React from "react";
import SKFooter from "./components/SKFooter";
import SKHeader from "./components/SKHeader";
import SKSignature from "./components/SKSignature";
import SKCopyWatermark from "./components/SKCopyWatermark";

interface SKKematianTemplateProps {
  data: ISuratKeterangan;
  qrCodeValue: string;
}

const SKKematianTemplate: React.FC<SKKematianTemplateProps> = ({
  data,
  qrCodeValue,
}) => {
  const skKematian = data.sk_kematian;

  if (!skKematian) return null;

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
          SURAT KETERANGAN KEMATIAN
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
          Yang bertanda tangan dibawah ini, menerangkan:
        </Text>

        {/* Personal Data of Deceased */}
        <View style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Nama</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>
              {skKematian.death_name}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>
              Tempat / Tanggal Lahir
            </Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>
              {skKematian.death_born_place},{" "}
              {format(new Date(skKematian.death_born_birth), "dd-MM-yyyy")}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>N I K</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>{skKematian.death_nik}</Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Jenis Kelamin</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>
              {formatGender(skKematian.death_gender)}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Agama</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>{skKematian.death_religion}</Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Alamat</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>{skKematian.death_address}</Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Desa</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>Jangur</Text>
          </View>
        </View>

        {/* Death Information */}
        <Text
          style={{
            fontSize: 12,
            textAlign: "justify",
            marginBottom: 15,
            lineHeight: 1.5,
            textDecoration: "underline",
          }}
        >
          Telah meninggal dunia pada:
        </Text>

        <View style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Hari</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>
              {format(new Date(skKematian.death_date), "EEEE")}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Tanggal</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>
              {format(new Date(skKematian.death_date), "dd-MM-yyyy")}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Bertempat</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>{skKematian.death_place}</Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Penyebab kematian</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>{skKematian.death_reason}</Text>
          </View>
        </View>

        {/* Reporter Information */}
        <Text
          style={{
            fontSize: 12,
            textAlign: "justify",
            marginBottom: 15,
            lineHeight: 1.5,
            textDecoration: "underline",
          }}
        >
          Surat keterangan ini dibuat berdasarkan keterangan pelapor:
        </Text>

        <View style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Nama</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>{skKematian.name}</Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>
              Tempat / Tanggal Lahir
            </Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>
              {skKematian.born_place},{" "}
              {format(new Date(skKematian.born_birth), "dd-MM-yyyy")}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>N I K</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>{skKematian.nik}</Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Jenis Kelamin</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>
              {formatGender(skKematian.gender)}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Status</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>
              {formatMaritalStatus(skKematian.marital_status)}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Agama</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>{skKematian.religion}</Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Alamat</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>{skKematian.address}</Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Desa/Kel.</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>Desa Jangur</Text>
          </View>
        </View>

        <Text
          style={{
            fontSize: 12,
            textAlign: "justify",
            marginBottom: 40,
            lineHeight: 1.5,
            textDecoration: "underline",
          }}
        >
          Hubungan pelapor dengan yang meninggal:{" "}
          {skKematian.death_reporter_relation}
        </Text>

        {/* Signature */}
        <SKSignature date={data.createdAt} qrCodeValue={qrCodeValue} />

        <SKFooter qrCodeValue={qrCodeValue} />
      </Page>
    </Document>
  );
};

export default SKKematianTemplate;
