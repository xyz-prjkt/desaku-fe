import { formatGender } from "@/constants/gender";
import { formatMaritalStatus } from "@/constants/marital-status";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";
import React from "react";
import SKFooter from "./components/SKFooter";
import SKHeader from "./components/SKHeader";
import SKSignature from "./components/SKSignature";

interface SKDispensasiTemplateProps {
  data: ISuratKeterangan;
  qrCodeValue: string;
}

const SKDispensasiTemplate: React.FC<SKDispensasiTemplateProps> = ({
  data,
  qrCodeValue,
}) => {
  const skDispensasi = data.sk_dispensasi;

  if (!skDispensasi) return null;

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
          SURAT KETERANGAN PERMOHONAN DISPENSASI
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
          Sumberasih, Kabupaten Probolinggo, menerangkan dengan sebenarnya
          bahwa:
        </Text>

        {/* Personal Data */}
        <View style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Nama</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>
              {skDispensasi.name}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>
              Tempat / Tanggal Lahir
            </Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>
              {skDispensasi.born_place},{" "}
              {format(new Date(skDispensasi.born_birth), "dd-MM-yyyy")}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>NIK</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>{skDispensasi.nik}</Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Jenis Kelamin</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>
              {formatGender(skDispensasi.gender)}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Status perkawinan</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>
              {formatMaritalStatus(skDispensasi.marital_status)}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Agama</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>{skDispensasi.religion}</Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Pekerjaan</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>{skDispensasi.work}</Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Alamat</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>{skDispensasi.address}</Text>
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
          Orang tersebut di atas adalah benar – benar penduduk Desa Jangur
          Kecamatan Sumberasih Kabupaten Probolinggo, dan ia mohon ijin untuk
          dispensasi selama {format(new Date(skDispensasi.start_date), "dd")}{" "}
          hari di mulai dari:
        </Text>

        <View style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 100 }}>Hari</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>
              {format(new Date(skDispensasi.start_date), "EEEE")}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 100 }}>Tanggal</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>
              {format(new Date(skDispensasi.start_date), "dd-MM-yyyy")}
            </Text>
          </View>
        </View>

        <Text style={{ fontSize: 12, marginBottom: 8 }}>Sampai dengan</Text>

        <View style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 100 }}>Hari</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>
              {format(new Date(skDispensasi.end_date), "EEEE")}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 100 }}>Tanggal</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>
              {format(new Date(skDispensasi.end_date), "dd-MM-yyyy")}
            </Text>
          </View>
        </View>

        <Text
          style={{
            fontSize: 12,
            textAlign: "justify",
            marginBottom: 20,
            lineHeight: 1.5,
          }}
        >
          Disebabkan karena {skDispensasi.reason} yang bertempat di Desa Jangur
          Kecamatan Sumberasih Kabupaten Probolinggo. Keterangan ini dibuat
          untuk persyaratan {skDispensasi.purpose}.
        </Text>

        <Text
          style={{
            fontSize: 12,
            textAlign: "justify",
            marginBottom: 40,
            lineHeight: 1.5,
          }}
        >
          Demikian surat keterangan ini dibuat dengan sebenar - benarnya dan
          untuk dapat diperg unakan sebagai mana mestinya.
        </Text>

        {/* Signature */}
        <SKSignature date={data.createdAt} qrCodeValue={qrCodeValue} />

        <SKFooter qrCodeValue={qrCodeValue} />
      </Page>
    </Document>
  );
};

export default SKDispensasiTemplate;
