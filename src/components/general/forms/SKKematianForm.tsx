import { DatePicker } from "@/components/atoms/date-picker";
import { FormInputArea } from "@/components/atoms/input";
import FormInput from "@/components/atoms/input/FormInput";
import GenderSelectInput from "@/components/general/select/GenderSelectInput";
import ReligionSelectInput from "@/components/general/select/ReligionSelectInput";
import { Col, Row, Space } from "antd";
import MaritalStatusSelectInput from "../select/MaritalStatusSelectInput";

const SKKematianForm = () => {
  return (
    <Space direction="vertical" className="w-full">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <FormInput
            isRequired
            name="death_name"
            label="Nama Lengkap"
            placeholder="Masukkan nama lengkap"
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <FormInput
            isRequired
            name="death_nik"
            label="NIK"
            placeholder="Masukkan NIK (16 digit)"
            maxLength={16}
          />
        </Col>
        <Col span={12}>
          <GenderSelectInput
            label="Jenis Kelamin"
            name="death_gender"
            isRequired
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <FormInput
            isRequired
            name="death_born_place"
            label="Tempat Lahir"
            placeholder="Masukkan tempat lahir"
          />
        </Col>
        <Col span={12}>
          <DatePicker
            isRequired
            name="death_born_birth"
            label="Tanggal Lahir"
            fullWidth
            placeholder="Pilih tanggal lahir"
            format="DD/MM/YYYY"
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={8}>
          <ReligionSelectInput isRequired name="death_religion" label="Agama" />
        </Col>
        <Col span={8}>
          <MaritalStatusSelectInput
            isRequired
            name="death_marital_status"
            label="Status Pernikahan"
          />
        </Col>

        <Col span={8}>
          <FormInput
            isRequired
            name="death_work"
            label="Pekerjaan"
            placeholder="Masukkan pekerjaan"
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <FormInputArea
            isRequired
            name="death_address"
            label="Alamat Lengkap"
            placeholder="Masukkan alamat lengkap"
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <DatePicker
            isRequired
            name="death_date"
            label="Tanggal Kematian"
            fullWidth
            placeholder="Pilih tanggal kematian"
            format="DD/MM/YYYY"
          />
        </Col>
        <Col span={12}>
          <FormInput
            isRequired
            name="death_place"
            label="Tempat Kematian"
            placeholder="Masukkan tempat kematian"
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <FormInputArea
            isRequired
            name="death_reason"
            label="Sebab Kematian"
            placeholder="Masukkan sebab kematian"
          />
        </Col>
      </Row>
    </Space>
  );
};

export default SKKematianForm;
