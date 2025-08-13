import { DatePicker, Space } from "antd";

interface MySKKtpSementaraFilterProps {
  handleOptionalChange: any;
}

const MySKKtpSementaraFilter = ({
  handleOptionalChange,
}: MySKKtpSementaraFilterProps) => {
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

export default MySKKtpSementaraFilter;
