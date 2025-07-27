import ApprovalsTag from "@/components/atoms/approvals-tag/ApprovalsTag";
import { BaseTable } from "@/components/molecules/table";
import { useTableAsync } from "@/hooks";
import { IUserSk } from "@/interfaces/services/dashboard";
import { useGetUserSkKematian } from "@/services/sk-kematian.service";
import { Button, Card, Space } from "antd";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useNavigate } from "react-router";
import MySKKematianFilter from "./MySKKematianFilter";

const MySKKematianTable = () => {
  const {
    paginateRequest,
    handleSearchChange,
    handlePageChange,
    handleOptionalChange,
  } = useTableAsync<{
    fromDate: string;
    toDate: string;
  }>({});
  const { data: userSkKematian, isLoading: userSkKematianIsLoading } =
    useGetUserSkKematian(paginateRequest);

  const navigate = useNavigate();

  return (
    <Card>
      <BaseTable<IUserSk>
        columns={[
          {
            title: "Nama Mendiang",
            key: "death_name",
            dataIndex: "sk_kematian",
            render: (record) => record.name,
          },
          {
            title: "Tanggal Kematian",
            key: "death_date",
            dataIndex: "sk_kematian",
            render: (record) =>
              format(new Date(record.death_date), "EEEE, dd MMMM yyyy, HH:mm", {
                locale: id,
              }),
          },
          {
            title: "Alamat",
            key: "address",
            dataIndex: "sk_kematian",
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
            dataIndex: "id",
            render: (record) => (
              <Space>
                <Button
                  type="link"
                  onClick={() => navigate(`/my-sk/kematian/${record}/detail`)}
                >
                  Detail
                </Button>
              </Space>
            ),
          },
        ]}
        filterComponents={
          <MySKKematianFilter handleOptionalChange={handleOptionalChange} />
        }
        actionComponent={
          <Button
            type="primary"
            onClick={() => navigate("/request-sk/kematian")}
          >
            Ajukan SK Kematian
          </Button>
        }
        isLoading={userSkKematianIsLoading}
        withSearch
        data={userSkKematian?.data}
        onSearchChange={(v) => handleSearchChange(v)}
        withQuickPageJumper
        sort={paginateRequest.sort}
        orderBy={paginateRequest.orderBy}
        total={userSkKematian?.meta?.total}
        pageSize={paginateRequest.limit}
        currentPage={paginateRequest.page}
        onPageChange={handlePageChange}
        pageSizeOptions={[2, 25, 30, 100]}
      />
    </Card>
  );
};

export default MySKKematianTable;
