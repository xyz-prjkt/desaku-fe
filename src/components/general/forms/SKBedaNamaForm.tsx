import { FormInputArea } from "@/components/atoms/input";
import FormInput from "@/components/atoms/input/FormInput";
import { Col, Row, Space } from "antd";

const SKBedaNamaForm = () => {
  return (
    <Space direction="vertical" className="w-full">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <FormInput
            isRequired
            name="no_kk"
            label="No. KK"
            placeholder="Masukkan No. KK (16 digit)"
            maxLength={16}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <FormInputArea
            isRequired
            name="false_document"
            label="Dokumen Yang Salah"
            placeholder="Masukkan keterangan dokumen yang salah"
          />
        </Col>
      </Row>
    </Space>
  );
};

export default SKBedaNamaForm;
