import { DatePicker } from "@/components/atoms/date-picker";
import { FormInputArea } from "@/components/atoms/input";
import FormInput from "@/components/atoms/input/FormInput";
import GenderSelectInput from "@/components/general/select/GenderSelectInput";
import MaritalStatusSelectInput from "@/components/general/select/MaritalStatusSelectInput";
import ReligionSelectInput from "@/components/general/select/ReligionSelectInput";
import { Col, Row, Space } from "antd";

const SKGeneralForm = () => {
  return (
    <Space direction="vertical" className="w-full">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <FormInput
            disabled
            isRequired
            name="name"
            label="Nama Lengkap"
            placeholder="Masukkan nama lengkap"
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <FormInput
            disabled
            isRequired
            name="nik"
            label="NIK"
            placeholder="Masukkan NIK (16 digit)"
            maxLength={16}
          />
        </Col>
        <Col span={12}>
          <GenderSelectInput
            disabled
            label="Jenis Kelamin"
            name="gender"
            isRequired
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <FormInput
            disabled
            isRequired
            name="born_place"
            label="Tempat Lahir"
            placeholder="Masukkan tempat lahir"
          />
        </Col>
        <Col span={12}>
          <DatePicker
            disabled
            isRequired
            name="born_birth"
            label="Tanggal Lahir"
            fullWidth
            placeholder="Pilih tanggal lahir"
            format="DD/MM/YYYY"
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <ReligionSelectInput
            disabled
            isRequired
            name="religion"
            label="Agama"
          />
        </Col>
        <Col span={12}>
          <MaritalStatusSelectInput
            disabled
            isRequired
            name="marital_status"
            label="Status Pernikahan"
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <FormInput
            disabled
            isRequired
            name="work"
            label="Pekerjaan"
            placeholder="Masukkan pekerjaan"
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <FormInputArea
            disabled
            isRequired
            name="address"
            label="Alamat Lengkap"
            placeholder="Masukkan alamat lengkap"
          />
        </Col>
      </Row>
    </Space>
  );
};

export default SKGeneralForm;
