import { formatGender } from "@/constants/gender";
import { formatMaritalStatus } from "@/constants/marital-status";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";
import React from "react";
import SKFooter from "./components/SKFooter";
import SKHeader from "./components/SKHeader";
import SKSignature from "./components/SKSignature";

interface SKKehilanganTemplateProps {
  data: ISuratKeterangan;
  qrCodeValue: string;
}

const SKKehilanganTemplate: React.FC<SKKehilanganTemplateProps> = ({
  data,
  qrCodeValue,
}) => {
  const skKehilangan = data.sk_kehilangan;

  if (!skKehilangan) return null;

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
          SURAT KETERANGAN KEHILANGAN
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
              {skKehilangan.name}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>NIK</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>{skKehilangan.nik}</Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Lahir</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>
              {skKehilangan.born_place},{" "}
              {format(new Date(skKehilangan.born_birth), "dd-MM-yyyy")}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Jenis Kelamin</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>
              {formatGender(skKehilangan.gender)}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Status Perkawinan</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>
              {formatMaritalStatus(skKehilangan.marital_status)}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Agama</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>{skKehilangan.religion}</Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Pekerjaan</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>Pegawai Negeri Sipil (PNS)</Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Alamat</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>{skKehilangan.address}</Text>
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
          Orang tersebut diatas adalah benar-benar penduduk Desa Jangur
          Kecamatan Sumberasih Kabupaten Probolinggo. Dan kehilangan sebuah
          Kartu Keluarga (KK) di {skKehilangan.lost_place}.
        </Text>

        <Text
          style={{
            fontSize: 12,
            textAlign: "justify",
            marginBottom: 40,
            lineHeight: 1.5,
          }}
        >
          Demikian Surat Keterangan ini kami buat dengan sebenarnya dan dapat
          dipergunakan sebagai mana mestinya.
        </Text>

        {/* Signature */}
        <SKSignature date={data.createdAt} />

        <SKFooter qrCodeValue={qrCodeValue} />
      </Page>
    </Document>
  );
};

export default SKKehilanganTemplate;
