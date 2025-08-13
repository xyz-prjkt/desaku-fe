import FormInput from "@/components/atoms/input/FormInput";
import { Col, Row, Space } from "antd";

const SKKehilanganForm = () => {
  return (
    <Space direction="vertical" className="w-full">
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <FormInput
            isRequired
            name="lost_object"
            label="Barang Yang Hilang"
            placeholder="Masukkan barang yang hilang"
          />
        </Col>
        <Col span={12}>
          <FormInput
            isRequired
            name="lost_place"
            label="Tempat Kehilangan"
            placeholder="Masukkan tempat kehilangan"
          />
        </Col>
      </Row>
    </Space>
  );
};

export default SKKehilanganForm;
