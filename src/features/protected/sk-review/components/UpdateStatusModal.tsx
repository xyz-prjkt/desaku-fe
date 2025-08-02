import { Modal, Button, Select, Form, message } from "antd";
import { useEffect } from "react";
import { useUpdateSkStatus } from "@/services/sk-review.service";
import { ISkListItem } from "@/interfaces/services/sk-list";
import { ApprovalStatus } from "@/interfaces/services/status";

interface IUpdateStatusModalProps {
  open: boolean;
  onClose: () => void;
  data: ISkListItem | null;
}

const UpdateStatusModal = ({
  open,
  onClose,
  data,
}: IUpdateStatusModalProps) => {
  const [form] = Form.useForm();
  const { mutate: updateStatus, isPending } = useUpdateSkStatus();

  const statusOptions = [
    { label: "Approved", value: "APPROVED" },
    { label: "Rejected", value: "REJECTED" },
    { label: "Revised", value: "REVISED" },
    { label: "Pending", value: "PENDING" },
  ];

  useEffect(() => {
    if (data) {
      // Get current status from user_approvers if exists
      const currentStatus =
        data.user_approvers?.length > 0
          ? data.user_approvers[0].status
          : "PENDING";

      form.setFieldsValue({
        status: currentStatus,
      });
    }
  }, [data, form]);

  const handleSubmit = (values: { status: ApprovalStatus }) => {
    if (!data) return;

    updateStatus(
      {
        id: data.id,
        data: { status: values.status },
      },
      {
        onSuccess: () => {
          message.success("Status berhasil diperbarui");
          onClose();
          form.resetFields();
        },
        onError: () => {
          message.error("Gagal memperbarui status");
        },
      },
    );
  };

  const handleCancel = () => {
    onClose();
    form.resetFields();
  };

  const getSkDetailInfo = () => {
    if (!data) return null;

    if (data.sk_type === "KEMATIAN" && data.sk_kematian) {
      return (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Detail SK Kematian</h4>
          <p>
            <strong>Nama:</strong> {data.sk_kematian.name}
          </p>
          <p>
            <strong>NIK:</strong> {data.sk_kematian.nik}
          </p>
          <p>
            <strong>Tanggal Kematian:</strong>{" "}
            {new Date(data.sk_kematian.death_date).toLocaleDateString("id-ID")}
          </p>
        </div>
      );
    }

    if (data.sk_type === "TIDAK_MAMPU" && data.sk_tidak_mampu) {
      return (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Detail SK Tidak Mampu</h4>
          <p>
            <strong>Nama:</strong> {data.sk_tidak_mampu.name}
          </p>
          <p>
            <strong>NIK:</strong> {data.sk_tidak_mampu.nik}
          </p>
          <p>
            <strong>Alasan:</strong> {data.sk_tidak_mampu.reason}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <Modal
      title="Update Status Surat Keterangan"
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      {data && (
        <div>
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium mb-2">Informasi Pemohon</h4>
            <p>
              <strong>Nama:</strong> {data.user.name}
            </p>
            <p>
              <strong>Email:</strong> {data.user.email}
            </p>
            <p>
              <strong>NIK:</strong> {data.user.nik}
            </p>
            <p>
              <strong>Jenis SK:</strong>{" "}
              {data.sk_type === "KEMATIAN" ? "SK Kematian" : "SK Tidak Mampu"}
            </p>
            <p>
              <strong>Tanggal Pengajuan:</strong>{" "}
              {new Date(data.createdAt).toLocaleDateString("id-ID")}
            </p>
          </div>

          {getSkDetailInfo()}

          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: "Pilih status!" }]}
            >
              <Select
                placeholder="Pilih status"
                options={statusOptions}
                size="large"
              />
            </Form.Item>

            <div className="flex justify-end gap-2">
              <Button onClick={handleCancel}>Batal</Button>
              <Button type="primary" htmlType="submit" loading={isPending}>
                Update Status
              </Button>
            </div>
          </Form>
        </div>
      )}
    </Modal>
  );
};

export default UpdateStatusModal;
