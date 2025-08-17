import { Image, Link, Text, View } from "@react-pdf/renderer";
import React from "react";
import SKCopyWatermark from "./SKCopyWatermark";

const SKFooter: React.FC<{ qrCodeValue: string }> = ({ qrCodeValue }) => {
  if (!qrCodeValue) return <SKCopyWatermark />;
  return (
    <View
      fixed
      style={{
        position: "absolute",
        bottom: 18,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 15,
        }}
      >
        <View
          style={{
            width: 30,
            height: 45,
          }}
        >
          <Image src={qrCodeValue} style={{ width: 45, height: 45 }} />
        </View>
        <Text
          style={{
            fontSize: 10,
            fontStyle: "italic",
            textAlign: "left",
            opacity: 0.6,
            lineHeight: 1.4,
            marginLeft: 8,
          }}
        >
          <>
            Dokumen diterbitkan oleh{" "}
            <span>
              <Link
                style={{
                  color: "#1976d2",
                  textDecoration: "underline",
                  fontSize: 10,
                }}
                src={
                  typeof window !== "undefined"
                    ? window.location.origin
                    : "https://"
                }
              >
                {"Desaku Digital Administration"}
              </Link>
            </span>
            {"\nScan QR Code di samping untuk mengecek keaslian dokumen"}
          </>
        </Text>
      </View>
    </View>
  );
};

export default SKFooter;
