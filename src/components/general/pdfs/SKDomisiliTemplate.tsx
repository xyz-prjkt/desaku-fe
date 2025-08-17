import { formatGender } from "@/constants/gender";
import { formatMaritalStatus } from "@/constants/marital-status";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";
import React from "react";
import { Logo } from "./assets";

interface SKDomisiliTemplateProps {
  data: ISuratKeterangan;
}

const SKDomisiliTemplate: React.FC<SKDomisiliTemplateProps> = ({ data }) => {
  const skDomisili = data.sk_domisili;

  if (!skDomisili) return null;

  return (
    <Document>
      <Page size="A4" style={{ fontFamily: "Times-Roman", padding: 40 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <View
            style={{
              width: 62,
              height: 62,
              marginRight: 16,
            }}
          >
            <Image src={Logo} />
          </View>
          <View>
            <Text
              style={{ fontSize: 14, fontWeight: "bold", textAlign: "center" }}
            >
              PEMERINTAH KABUPATEN PROBOLINGGO
            </Text>
            <Text
              style={{ fontSize: 14, fontWeight: "bold", textAlign: "center" }}
            >
              KECAMATAN SUMBERASIH
            </Text>
            <Text
              style={{ fontSize: 14, fontWeight: "bold", textAlign: "center" }}
            >
              DESA JANGUR
            </Text>
            <Text style={{ fontSize: 10, textAlign: "center", marginTop: 5 }}>
              Jl. Malindo No. 1 Kode Pos 67251
            </Text>
          </View>
        </View>

        {/* Divider */}
        <View style={{ borderBottom: "2px solid black", marginBottom: 20 }} />

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
          SURAT KETERANGAN DOMISILI
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
              {skDomisili.name}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>
              Tempat / Tanggal Lahir
            </Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>
              {skDomisili.born_place}, {skDomisili.born_birth}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Jenis Kelamin</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>
              {formatGender(skDomisili.gender)}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Status Perkawinan</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>
              {formatMaritalStatus(skDomisili.marital_status)}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Agama</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>{skDomisili.religion}</Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Pekerjaan</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>-</Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 12, width: 150 }}>Alamat</Text>
            <Text style={{ fontSize: 12, width: 20 }}>:</Text>
            <Text style={{ fontSize: 12 }}>{skDomisili.address}</Text>
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
          penelitian ia benar-benar berdomisili di Dusun Klompang Rt.014 Rw.004
          Desa Jangur Kecamatan Sumberasih Kabupaten Probolinggo.
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
        <View style={{ alignItems: "flex-end", marginBottom: 60 }}>
          <Text style={{ fontSize: 12, marginBottom: 5 }}>
            {format(new Date(data.createdAt), "dd MMMM yyyy")}
          </Text>
          <Text style={{ fontSize: 12, marginBottom: 5 }}>Mengetahui</Text>
          <Text style={{ fontSize: 12, marginBottom: 60 }}>
            Kepala desa jangur
          </Text>
          <Text style={{ fontSize: 12, fontWeight: "bold" }}>LOTVI</Text>
        </View>
      </Page>
    </Document>
  );
};

export default SKDomisiliTemplate;
