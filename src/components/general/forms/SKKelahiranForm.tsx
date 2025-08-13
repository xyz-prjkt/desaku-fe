import FormInput from "@/components/atoms/input/FormInput";
import { Col, Row, Space } from "antd";

const SKKelahiranForm = () => {
  return (
    <Space direction="vertical" className="w-full">
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <FormInput
            isRequired
            name="father_name"
            label="Nama Ayah"
            placeholder="Masukkan nama ayah"
          />
        </Col>
        <Col span={12}>
          <FormInput
            isRequired
            name="mother_name"
            label="Nama Ibu"
            placeholder="Masukkan nama ibu"
          />
        </Col>
      </Row>
    </Space>
  );
};

export default SKKelahiranForm;
