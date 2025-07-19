import { DatePicker } from "@/components/atoms/date-picker";
import { FormProvider } from "@/components/atoms/form";
import { FormInputArea } from "@/components/atoms/input";
import FormInput from "@/components/atoms/input/FormInput";
import GenderSelectInput from "@/components/general/select/GenderSelectInput";
import ReligionSelectInput from "@/components/general/select/ReligionSelectInput";
import { useAnt } from "@/hooks";
import { ISkKematianCreate } from "@/interfaces/services/sk-kematian";
import { useCreateSkKematian } from "@/services/sk-kematian.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, Space } from "antd";
import { useForm } from "react-hook-form";
import skKematianSchema from "../schemas/sk-kematian";
import { useNavigate } from "react-router";

const SKKematianForm = () => {
  const navigate = useNavigate();
  const { message } = useAnt();
  const formMethods = useForm<ISkKematianCreate>({
    resolver: yupResolver(skKematianSchema),
  });
  const { mutateAsync: createSk, isPending: createSkIsPending } =
    useCreateSkKematian();

  const onSubmit = async (data: ISkKematianCreate) => {
    await createSk({
      ...data,
      born_birth: new Date(data.born_birth).toISOString(),
      death_date: new Date(data.death_date).toISOString(),
    })
      .then((res) => {
        if (res.success) {
          message.success("Berhasil mengirim permintaan");
          navigate(`/my-sk/kematian/${res.data.id}/detail`);
        }
      })
      .catch((err) => message.error((err as Error).message));
  };

  return (
    <FormProvider formMethods={{ ...formMethods }} onSubmit={onSubmit}>
      <Space direction="vertical" size="large" className="w-full">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <FormInput
              name="name"
              label="Nama Lengkap"
              placeholder="Masukkan nama lengkap"
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <FormInput
              name="nik"
              label="NIK"
              placeholder="Masukkan NIK (16 digit)"
              maxLength={16}
            />
          </Col>
          <Col span={12}>
            <GenderSelectInput label="Jenis Kelamin" name="gender" isRequired />
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <FormInput
              name="born_place"
              label="Tempat Lahir"
              placeholder="Masukkan tempat lahir"
            />
          </Col>
          <Col span={12}>
            <DatePicker
              name="born_birth"
              label="Tanggal Lahir"
              fullWidth
              placeholder="Pilih tanggal lahir"
              format="DD/MM/YYYY"
              onChange={(value) => {
                formMethods.setValue("born_birth", value);
              }}
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <ReligionSelectInput name="religion" label="Agama" isRequired />
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <FormInputArea
              name="address"
              label="Alamat Lengkap"
              placeholder="Masukkan alamat lengkap"
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <DatePicker
              name="death_date"
              label="Tanggal Kematian"
              fullWidth
              placeholder="Pilih tanggal kematian"
              format="DD/MM/YYYY"
              onChange={(value) => {
                formMethods.setValue("death_date", value);
              }}
            />
          </Col>
          <Col span={12}>
            <FormInput
              name="death_place"
              label="Tempat Kematian"
              placeholder="Masukkan tempat kematian"
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <FormInputArea
              name="death_reason"
              label="Sebab Kematian"
              placeholder="Masukkan sebab kematian"
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full"
              loading={createSkIsPending}
            >
              Kirim Permohonan
            </Button>
          </Col>
        </Row>
      </Space>
    </FormProvider>
  );
};

export default SKKematianForm;
