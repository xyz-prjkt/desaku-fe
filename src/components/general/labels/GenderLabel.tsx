interface GenderLabelProps {
  gender: string;
}

const GenderLabel = ({ gender }: GenderLabelProps) => {
  return gender === "MALE" ? "Laki-laki" : "Perempuan";
};

export default GenderLabel;
