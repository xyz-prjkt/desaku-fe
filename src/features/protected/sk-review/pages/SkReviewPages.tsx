import { ContentPaper } from "@/components/atoms/paper";
import ApprovalsTag from "@/components/atoms/approvals-tag/ApprovalsTag";
import { BaseTable } from "@/components/molecules/table";
import { useTableAsync } from "@/hooks";
import { useDialog } from "@/hooks/useDialog";
import { ISkListItem } from "@/interfaces/services/sk-list";
import { useGetSkList } from "@/services/sk-review.service";
import { Button, Card, Space, Tag } from "antd";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import UpdateStatusModal from "../components/UpdateStatusModal";

const SkReviewPages = () => {
  const {
    paginateRequest,
    handleSearchChange,
    handlePageChange,
  } = useTableAsync({});

  const { data: skList, isLoading: skListIsLoading } = useGetSkList(paginateRequest);

  const { open, data, handleClickOpen, handleClose } = useDialog<ISkListItem>();

  const getSkTypeLabel = (skType: string) => {
    switch (skType) {
      case "KEMATIAN":
        return <Tag color="red">SK Kematian</Tag>;
      case "TIDAK_MAMPU":
        return <Tag color="orange">SK Tidak Mampu</Tag>;
      default:
        return <Tag>{skType}</Tag>;
    }
  };

  const getSkDetailName = (record: ISkListItem) => {
    if (record.sk_type === "KEMATIAN" && record.sk_kematian) {
      return record.sk_kematian.name;
    }
    if (record.sk_type === "TIDAK_MAMPU" && record.sk_tidak_mampu) {
      return record.sk_tidak_mampu.name;
    }
    return "-";
  };

  const getSkDetailInfo = (record: ISkListItem) => {
    if (record.sk_type === "KEMATIAN" && record.sk_kematian) {
      return (
        <div>
          <div><strong>NIK:</strong> {record.sk_kematian.nik}</div>
          <div><strong>Tanggal Kematian:</strong> {format(new Date(record.sk_kematian.death_date), "dd MMMM yyyy", { locale: id })}</div>
        </div>
      );
    }
    if (record.sk_type === "TIDAK_MAMPU" && record.sk_tidak_mampu) {
      return (
        <div>
          <div><strong>NIK:</strong> {record.sk_tidak_mampu.nik}</div>
          <div><strong>Alasan:</strong> {record.sk_tidak_mampu.reason}</div>
        </div>
      );
    }
    return "-";
  };

  return (
    <>
      <ContentPaper title="Review Permintaan Surat Keterangan">
        <Card>
          <BaseTable<ISkListItem>
            columns={[
              {
                title: "Jenis SK",
                key: "sk_type",
                dataIndex: "sk_type",
                render: (value) => getSkTypeLabel(value),
                width: 120,
              },
              {
                title: "Pemohon",
                key: "user",
                dataIndex: "user",
                render: (user) => (
                  <div>
                    <div><strong>{user.name}</strong></div>
                    <div className="text-gray-500 text-sm">{user.email}</div>
                    <div className="text-gray-500 text-sm">NIK: {user.nik}</div>
                  </div>
                ),
                width: 200,
              },
              {
                title: "Nama Subjek",
                key: "subject_name",
                render: (_, record) => getSkDetailName(record),
                width: 150,
              },
              {
                title: "Detail",
                key: "detail",
                render: (_, record) => getSkDetailInfo(record),
                width: 250,
              },
              {
                title: "Tanggal Pengajuan",
                dataIndex: "createdAt",
                key: "createdAt",
                render: (value) =>
                  format(new Date(value), "EEEE, dd MMMM yyyy, HH:mm", {
                    locale: id,
                  }),
                sorter: true,
                width: 180,
              },
              {
                title: "Status",
                key: "status",
                render: (_, record) => (
                  <ApprovalsTag approvers={record.user_approvers} />
                ),
                width: 120,
              },
              {
                title: "Aksi",
                key: "action",
                render: (_, record) => (
                  <Space>
                    <Button
                      type="primary"
                      size="small"
                      onClick={() => handleClickOpen(record)}
                    >
                      Update Status
                    </Button>
                  </Space>
                ),
                width: 120,
                fixed: "right",
              },
            ]}
            isLoading={skListIsLoading}
            withSearch
            data={skList?.data}
            onSearchChange={(v) => handleSearchChange(v)}
            withQuickPageJumper
            sort={paginateRequest.sort}
            orderBy={paginateRequest.orderBy}
            total={skList?.meta?.total}
            pageSize={paginateRequest.limit}
            currentPage={paginateRequest.page}
            onPageChange={handlePageChange}
            pageSizeOptions={[10, 25, 50, 100]}
          />
        </Card>
      </ContentPaper>

      <UpdateStatusModal
        open={open}
        onClose={handleClose}
        data={data}
      />
    </>
  );
};

export default SkReviewPages;
