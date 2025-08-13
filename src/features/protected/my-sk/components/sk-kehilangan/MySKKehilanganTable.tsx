import ApprovalsTag from "@/components/atoms/approvals-tag/ApprovalsTag";
import { BaseTable } from "@/components/molecules/table";
import { useTableAsync } from "@/hooks";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { useGetUserSkKehilangan } from "@/services/sk-kehilangan.service";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Card, Space } from "antd";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useNavigate } from "react-router";
import MySKKehilanganFilter from "./MySKKehilanganFilter";

const MySKKehilanganTable = () => {
  const {
    paginateRequest,
    handleSearchChange,
    handlePageChange,
    handleOptionalChange,
  } = useTableAsync<{
    fromDate: string;
    toDate: string;
  }>({});
  const { data: userSkKehilangan, isLoading: userSkKehilanganIsLoading } =
    useGetUserSkKehilangan(paginateRequest);

  const navigate = useNavigate();

  return (
    <Card>
      <BaseTable<ISuratKeterangan>
        columns={[
          {
            title: "Nama",
            key: "name",
            dataIndex: "sk_kehilangan",
            render: (record) => record.name,
          },
          {
            title: "NIK",
            key: "nik",
            dataIndex: "sk_kehilangan",
            render: (record) => record.nik,
          },
          {
            title: "Alamat",
            key: "address",
            dataIndex: "sk_kehilangan",
            width: 200,
            render: (record) => record.address,
          },
          {
            title: "Barang Hilang",
            key: "lost_object",
            dataIndex: "sk_kehilangan",
            render: (record) => record.lost_object,
          },
          {
            title: "Tempat Kehilangan",
            key: "lost_place",
            dataIndex: "sk_kehilangan",
            render: (record) => record.lost_place,
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
                    navigate(`/my-sk/kehilangan/${record.id}/detail`)
                  }
                />
              </Space>
            ),
          },
        ]}
        filterComponents={
          <MySKKehilanganFilter handleOptionalChange={handleOptionalChange} />
        }
        actionComponent={
          <Button
            type="primary"
            onClick={() => navigate("/request-sk/kehilangan")}
          >
            Ajukan SK Kehilangan
          </Button>
        }
        isLoading={userSkKehilanganIsLoading}
        withSearch
        data={userSkKehilangan?.data}
        onSearchChange={(v) => handleSearchChange(v)}
        withQuickPageJumper
        sort={paginateRequest.sort}
        orderBy={paginateRequest.orderBy}
        total={userSkKehilangan?.meta?.total}
        pageSize={paginateRequest.limit}
        currentPage={paginateRequest.page}
        onPageChange={handlePageChange}
        pageSizeOptions={[2, 25, 30, 100]}
      />
    </Card>
  );
};

export default MySKKehilanganTable;
