import { DatePicker } from "@/components/atoms/date-picker";
import { FormInputArea } from "@/components/atoms/input";
import { Col, Row, Space } from "antd";

const SKDispensasiForm = () => {
  return (
    <Space direction="vertical" className="w-full">
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <DatePicker
            isRequired
            name="start_date"
            label="Tanggal Mulai Dispensasi"
            fullWidth
            placeholder="Pilih tanggal mulai"
            format="DD/MM/YYYY"
          />
        </Col>
        <Col span={12}>
          <DatePicker
            isRequired
            name="end_date"
            label="Tanggal Akhir Dispensasi"
            fullWidth
            placeholder="Pilih tanggal akhir"
            format="DD/MM/YYYY"
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <FormInputArea
            isRequired
            name="reason"
            label="Alasan Dispensasi"
            placeholder="Masukkan alasan dispensasi"
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <FormInputArea
            isRequired
            name="purpose"
            label="Tujuan Dispensasi"
            placeholder="Masukkan tujuan dispensasi"
          />
        </Col>
      </Row>
    </Space>
  );
};

export default SKDispensasiForm;
