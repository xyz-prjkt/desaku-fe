import { SK_TYPE_MAP } from "@/constants/sk-type-map";
import { DatePicker, Select, Space } from "antd";

interface VillagerDashboardFilterProps {
  handleOptionalChange: any;
}

const VillagerDashboardFilter = ({
  handleOptionalChange,
}: VillagerDashboardFilterProps) => {
  return (
    <Space>
      <Select
        showSearch
        allowClear
        placeholder="Jenis SK"
        filterOption={false}
        popupMatchSelectWidth={false}
        options={Object.entries(SK_TYPE_MAP).map(([value, label]) => ({
          value,
          label,
        }))}
        onChange={(value) => handleOptionalChange("skType", value)}
      />
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

export default VillagerDashboardFilter;
