import { Text } from "@react-pdf/renderer";

const SKCopyWatermark = () => {
  return (
    <Text
      fixed
      style={{
        position: "absolute",
        top: "43%",
        left: "6%",
        opacity: 0.1,
        fontSize: 72,
        color: "#000",
        transform: "rotate(-30deg)",
      }}
    >
      Preview Document
    </Text>
  );
};

export default SKCopyWatermark;
