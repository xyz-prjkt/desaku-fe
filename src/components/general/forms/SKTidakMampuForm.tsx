import { FormInputArea } from "@/components/atoms/input";
import { Col, Row, Space } from "antd";

const SKTidakMampuForm = () => {
  return (
    <Space direction="vertical" className="w-full">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <FormInputArea
            isRequired
            name="reason"
            label="Alasan Permohonan"
            placeholder="Masukkan alasan permohonan surat keterangan tidak mampu"
          />
        </Col>
      </Row>
    </Space>
  );
};

export default SKTidakMampuForm;
