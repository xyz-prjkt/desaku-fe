import ApprovalsTag from "@/components/atoms/approvals-tag/ApprovalsTag";
import { BaseTable } from "@/components/molecules/table";
import { useTableAsync } from "@/hooks";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { useGetUserSkUsaha } from "@/services/sk-usaha.service";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Card, Space } from "antd";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useNavigate } from "react-router";
import MySKUsahaFilter from "./MySKUsahaFilter";

const MySKUsahaTable = () => {
  const {
    paginateRequest,
    handleSearchChange,
    handlePageChange,
    handleOptionalChange,
  } = useTableAsync<{
    fromDate: string;
    toDate: string;
  }>({});
  const { data: userSkUsaha, isLoading: userSkUsahaIsLoading } =
    useGetUserSkUsaha(paginateRequest);

  const navigate = useNavigate();

  return (
    <Card>
      <BaseTable<ISuratKeterangan>
        columns={[
          {
            title: "Nama",
            key: "name",
            dataIndex: "sk_usaha",
            render: (record) => record.name,
          },
          {
            title: "NIK",
            key: "nik",
            dataIndex: "sk_usaha",
            render: (record) => record.nik,
          },
          {
            title: "Alamat",
            key: "address",
            dataIndex: "sk_usaha",
            width: 200,
            render: (record) => record.address,
          },
          {
            title: "Jenis Usaha",
            key: "bussiness",
            dataIndex: "sk_usaha",
            render: (record) => record.bussiness,
          },
          {
            title: "Alasan",
            key: "reason",
            dataIndex: "sk_usaha",
            width: 200,
            render: (record) => record.reason,
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
                  onClick={() => navigate(`/my-sk/usaha/${record.id}/detail`)}
                />
              </Space>
            ),
          },
        ]}
        filterComponents={
          <MySKUsahaFilter handleOptionalChange={handleOptionalChange} />
        }
        actionComponent={
          <Button type="primary" onClick={() => navigate("/request-sk/usaha")}>
            Ajukan SK Usaha
          </Button>
        }
        isLoading={userSkUsahaIsLoading}
        withSearch
        data={userSkUsaha?.data}
        onSearchChange={(v) => handleSearchChange(v)}
        withQuickPageJumper
        sort={paginateRequest.sort}
        orderBy={paginateRequest.orderBy}
        total={userSkUsaha?.meta?.total}
        pageSize={paginateRequest.limit}
        currentPage={paginateRequest.page}
        onPageChange={handlePageChange}
        pageSizeOptions={[2, 25, 30, 100]}
      />
    </Card>
  );
};

export default MySKUsahaTable;
