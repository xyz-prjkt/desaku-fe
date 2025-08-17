import React from "react";
import { Text, View, Image } from "@react-pdf/renderer";
import { Logo } from "../assets";

const SKHeader: React.FC = () => {
  return (
    <>
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
    </>
  );
};

export default SKHeader;
