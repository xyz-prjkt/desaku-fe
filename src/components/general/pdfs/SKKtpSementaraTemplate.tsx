import { formatGender } from "@/constants/gender";
import { formatMaritalStatus } from "@/constants/marital-status";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";
import React from "react";
import SKFooter from "./components/SKFooter";
import SKHeader from "./components/SKHeader";
import SKSignature from "./components/SKSignature";

interface SKKtpSementaraTemplateProps {
  data: ISuratKeterangan;
  qrCodeValue: string;
}

const SKKtpSementaraTemplate: React.FC<SKKtpSementaraTemplateProps> = ({
  data,
  qrCodeValue,
}) => {
  const skKtpSementara = data.sk_ktp_sementara;

  if (!skKtpSementara) return null;

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
          SURAT KETERANGAN (KTP) SEMENTARA
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
              {skKtpSementara.name}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>NIK</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>{skKtpSementara.nik}</Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>
              Tempat / Tanggal Lahir
            </Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>
              {skKtpSementara.born_place},{" "}
              {format(new Date(skKtpSementara.born_birth), "dd-MM-yyyy")}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Jenis Kelamin</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>
              {formatGender(skKtpSementara.gender)}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Status Perkawinan</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>
              {formatMaritalStatus(skKtpSementara.marital_status)}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Agama</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>{skKtpSementara.religion}</Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Pekerjaan</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>{skKtpSementara.work}</Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Alamat</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>{skKtpSementara.address}</Text>
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
          Kecamatan Sumberasih Kabupaten Probolinggo, dan setelah diadakan
          penelitian ia benar-benar sudah Foto untuk membuat Kartu Tanda
          penduduk (KTP) baru, namun sampai dengan saat ini benar - benar masih
          dalam proses (belum selesai).
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

export default SKKtpSementaraTemplate;
