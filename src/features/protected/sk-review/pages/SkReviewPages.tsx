import ApprovalsTag from "@/components/atoms/approvals-tag/ApprovalsTag";
import { ContentPaper } from "@/components/atoms/paper";
import { BaseTable } from "@/components/molecules/table";
import { useTableAsync } from "@/hooks";
import { useDialog } from "@/hooks/useDialog";
import { ISkListItem } from "@/interfaces/services/sk-list";
import { useGetSkList } from "@/services/sk-review.service";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Card, Space } from "antd";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import UpdateStatusModal from "../components/UpdateStatusModal";
import { Link } from "react-router";

const SkReviewPages = () => {
  const { paginateRequest, handleSearchChange, handlePageChange } =
    useTableAsync({});

  const { data: skList, isLoading: skListIsLoading } =
    useGetSkList(paginateRequest);

  const { open, data, handleClickOpen, handleClose } = useDialog<ISkListItem>();

  return (
    <>
      <ContentPaper title="Review Permintaan Surat Keterangan">
        <Card>
          <BaseTable<ISkListItem>
            columns={[
              {
                title: "Pemohon",
                key: "user",
                dataIndex: "user",
                render: (user) => (
                  <div>
                    <div>
                      <strong>{user.name}</strong>
                    </div>
                    <div className="text-gray-500 text-sm">{user.email}</div>
                    <div className="text-gray-500 text-sm">NIK: {user.nik}</div>
                  </div>
                ),
                width: 200,
              },
              {
                title: "Jenis SK",
                key: "sk_type",
                dataIndex: "sk_type",
                width: 120,
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
                    <EditOutlined
                      className="text-orange-500"
                      onClick={() => handleClickOpen(record)}
                    >
                      Change Status
                    </EditOutlined>
                    <Link
                      to={`${record.sk_type.toLowerCase()}/${record.id}/detail`}
                    >
                      <EyeOutlined className="text-blue-500" />
                    </Link>
                  </Space>
                ),
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

      <UpdateStatusModal open={open} onClose={handleClose} data={data} />
    </>
  );
};

export default SkReviewPages;
