import { DatePicker, Space } from "antd";

interface MySKDispensasiFilterProps {
  handleOptionalChange: any;
}

const MySKDispensasiFilter = ({
  handleOptionalChange,
}: MySKDispensasiFilterProps) => {
  return (
    <Space>
      <DatePicker.RangePicker
        onChange={(date) => {
          if (date) {
            handleOptionalChange("fromDate", date[0]?.toISOString());
            handleOptionalChange("toDate", date[1]?.toISOString());
          } else {
            handleOptionalChange("fromDate", null);
            handleOptionalChange("toDate", null);
          }
        }}
      />
    </Space>
  );
};

export default MySKDispensasiFilter;
