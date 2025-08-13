import { FormInputArea } from "@/components/atoms/input";
import FormInput from "@/components/atoms/input/FormInput";
import { Col, Row, Space } from "antd";

const SKUsahaForm = () => {
  return (
    <Space direction="vertical" className="w-full">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <FormInput
            isRequired
            name="bussiness"
            label="Jenis Usaha"
            placeholder="Masukkan jenis usaha"
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <FormInputArea
            isRequired
            name="reason"
            label="Alasan Permohonan"
            placeholder="Masukkan alasan permohonan surat keterangan usaha"
          />
        </Col>
      </Row>
    </Space>
  );
};

export default SKUsahaForm;
