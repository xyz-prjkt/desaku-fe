import ApprovalsTag from "@/components/atoms/approvals-tag/ApprovalsTag";
import { BaseTable } from "@/components/molecules/table";
import { useTableAsync } from "@/hooks";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { useGetUserSkDispensasi } from "@/services/sk-dispensasi.service";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Card, Space } from "antd";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useNavigate } from "react-router";
import MySKDispensasiFilter from "./MySKDispensasiFilter";

const MySKDispensasiTable = () => {
  const {
    paginateRequest,
    handleSearchChange,
    handlePageChange,
    handleOptionalChange,
  } = useTableAsync<{
    fromDate: string;
    toDate: string;
  }>({});
  const { data: userSkDispensasi, isLoading: userSkDispensasiIsLoading } =
    useGetUserSkDispensasi(paginateRequest);

  const navigate = useNavigate();

  return (
    <Card>
      <BaseTable<ISuratKeterangan>
        columns={[
          {
            title: "Nama",
            key: "name",
            dataIndex: "sk_dispensasi",
            render: (record) => record.name,
          },
          {
            title: "NIK",
            key: "nik",
            dataIndex: "sk_dispensasi",
            render: (record) => record.nik,
          },
          {
            title: "Alamat",
            key: "address",
            dataIndex: "sk_dispensasi",
            width: 260,
            render: (record) => record.address,
          },
          {
            title: "Tanggal Mulai",
            key: "start_date",
            dataIndex: "sk_dispensasi",
            render: (record) =>
              format(new Date(record.start_date), "EEEE, dd MMMM yyyy", {
                locale: id,
              }),
          },
          {
            title: "Tanggal Akhir",
            key: "end_date",
            dataIndex: "sk_dispensasi",
            render: (record) =>
              format(new Date(record.end_date), "EEEE, dd MMMM yyyy", {
                locale: id,
              }),
          },
          {
            title: "Tanggal Pengajuan",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (value) =>
              format(new Date(value), "EEEE, dd MMMM yyyy, HH:mm", {
                locale: id,
              }),
          },
          {
            title: "Status",
            render: (_, record) => (
              <ApprovalsTag approvers={record.user_approvers} />
            ),
          },
          {
            key: "action",
            title: "Aksi",
            fixed: "right",
            render: (record) => (
              <Space>
                <EyeOutlined
                  className="text-blue-500"
                  type="link"
                  onClick={() =>
                    navigate(`/my-sk/dispensasi/${record.id}/detail`)
                  }
                />
              </Space>
            ),
          },
        ]}
        filterComponents={
          <MySKDispensasiFilter handleOptionalChange={handleOptionalChange} />
        }
        actionComponent={
          <Button
            type="primary"
            onClick={() => navigate("/request-sk/dispensasi")}
          >
            Ajukan SK Dispensasi
          </Button>
        }
        isLoading={userSkDispensasiIsLoading}
        withSearch
        data={userSkDispensasi?.data}
        onSearchChange={(v) => handleSearchChange(v)}
        withQuickPageJumper
        sort={paginateRequest.sort}
        orderBy={paginateRequest.orderBy}
        total={userSkDispensasi?.meta?.total}
        pageSize={paginateRequest.limit}
        currentPage={paginateRequest.page}
        onPageChange={handlePageChange}
        pageSizeOptions={[2, 25, 30, 100]}
      />
    </Card>
  );
};

export default MySKDispensasiTable;
