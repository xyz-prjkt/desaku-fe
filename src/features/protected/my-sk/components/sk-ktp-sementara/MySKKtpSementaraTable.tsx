import ApprovalsTag from "@/components/atoms/approvals-tag/ApprovalsTag";
import { BaseTable } from "@/components/molecules/table";
import { useTableAsync } from "@/hooks";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { useGetUserSkKtpSementara } from "@/services/sk-ktp-sementara.service";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Card, Space } from "antd";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useNavigate } from "react-router";
import MySKKtpSementaraFilter from "./MySKKtpSementaraFilter";

const MySKKtpSementaraTable = () => {
  const {
    paginateRequest,
    handleSearchChange,
    handlePageChange,
    handleOptionalChange,
  } = useTableAsync<{
    fromDate: string;
    toDate: string;
  }>({});
  const { data: userSkKtpSementara, isLoading: userSkKtpSementaraIsLoading } =
    useGetUserSkKtpSementara(paginateRequest);

  const navigate = useNavigate();

  return (
    <Card>
      <BaseTable<ISuratKeterangan>
        columns={[
          {
            title: "Nama",
            key: "name",
            dataIndex: "sk_ktp_sementara",
            render: (record) => record.name,
          },
          {
            title: "NIK",
            key: "nik",
            dataIndex: "sk_ktp_sementara",
            render: (record) => record.nik,
          },
          {
            title: "Alamat",
            key: "address",
            dataIndex: "sk_ktp_sementara",
            width: 260,
            render: (record) => record.address,
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
                    navigate(`/my-sk/ktp-sementara/${record.id}/detail`)
                  }
                />
              </Space>
            ),
          },
        ]}
        filterComponents={
          <MySKKtpSementaraFilter handleOptionalChange={handleOptionalChange} />
        }
        actionComponent={
          <Button
            type="primary"
            onClick={() => navigate("/request-sk/ktp-sementara")}
          >
            Ajukan SK KTP Sementara
          </Button>
        }
        isLoading={userSkKtpSementaraIsLoading}
        withSearch
        data={userSkKtpSementara?.data}
        onSearchChange={(v) => handleSearchChange(v)}
        withQuickPageJumper
        sort={paginateRequest.sort}
        orderBy={paginateRequest.orderBy}
        total={userSkKtpSementara?.meta?.total}
        pageSize={paginateRequest.limit}
        currentPage={paginateRequest.page}
        onPageChange={handlePageChange}
        pageSizeOptions={[2, 25, 30, 100]}
      />
    </Card>
  );
};

export default MySKKtpSementaraTable;
