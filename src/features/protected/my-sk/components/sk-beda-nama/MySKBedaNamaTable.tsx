import ApprovalsTag from "@/components/atoms/approvals-tag/ApprovalsTag";
import { BaseTable } from "@/components/molecules/table";
import { useTableAsync } from "@/hooks";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { useGetUserSkBedaNama } from "@/services/sk-beda-nama.service";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Card, Space } from "antd";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useNavigate } from "react-router";
import MySKBedaNamaFilter from "./MySKBedaNamaFilter";

const MySKBedaNamaTable = () => {
  const {
    paginateRequest,
    handleSearchChange,
    handlePageChange,
    handleOptionalChange,
  } = useTableAsync<{
    fromDate: string;
    toDate: string;
  }>({});
  const { data: userSkBedaNama, isLoading: userSkBedaNamaIsLoading } =
    useGetUserSkBedaNama(paginateRequest);

  const navigate = useNavigate();

  return (
    <Card>
      <BaseTable<ISuratKeterangan>
        columns={[
          {
            title: "Nama",
            key: "name",
            dataIndex: "sk_beda_nama",
            render: (record) => record.name,
          },
          {
            title: "NIK",
            key: "nik",
            dataIndex: "sk_beda_nama",
            render: (record) => record.nik,
          },
          {
            title: "No. KK",
            key: "no_kk",
            dataIndex: "sk_beda_nama",
            render: (record) => record.no_kk,
          },
          {
            title: "Alamat",
            key: "address",
            dataIndex: "sk_beda_nama",
            width: 260,
            render: (record) => record.address,
          },
          {
            title: "Dokumen Yang Salah",
            key: "false_document",
            dataIndex: "sk_beda_nama",
            width: 200,
            render: (record) => record.false_document,
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
                    navigate(`/my-sk/beda-nama/${record.id}/detail`)
                  }
                />
              </Space>
            ),
          },
        ]}
        filterComponents={
          <MySKBedaNamaFilter handleOptionalChange={handleOptionalChange} />
        }
        actionComponent={
          <Button
            type="primary"
            onClick={() => navigate("/request-sk/beda-nama")}
          >
            Ajukan SK Beda Nama
          </Button>
        }
        isLoading={userSkBedaNamaIsLoading}
        withSearch
        data={userSkBedaNama?.data}
        onSearchChange={(v) => handleSearchChange(v)}
        withQuickPageJumper
        sort={paginateRequest.sort}
        orderBy={paginateRequest.orderBy}
        total={userSkBedaNama?.meta?.total}
        pageSize={paginateRequest.limit}
        currentPage={paginateRequest.page}
        onPageChange={handlePageChange}
        pageSizeOptions={[2, 25, 30, 100]}
      />
    </Card>
  );
};

export default MySKBedaNamaTable;
