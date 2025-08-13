import ApprovalsTag from "@/components/atoms/approvals-tag/ApprovalsTag";
import { BaseTable } from "@/components/molecules/table";
import { useTableAsync } from "@/hooks";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { useGetUserSkDomisili } from "@/services/sk-domisili.service";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Card, Space } from "antd";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useNavigate } from "react-router";
import MySKDomisiliFilter from "./MySKDomisiliFilter";

const MySKDomisiliTable = () => {
  const {
    paginateRequest,
    handleSearchChange,
    handlePageChange,
    handleOptionalChange,
  } = useTableAsync<{
    fromDate: string;
    toDate: string;
  }>({});
  const { data: userSkDomisili, isLoading: userSkDomisiliIsLoading } =
    useGetUserSkDomisili(paginateRequest);

  const navigate = useNavigate();

  return (
    <Card>
      <BaseTable<ISuratKeterangan>
        columns={[
          {
            title: "Nama",
            key: "name",
            dataIndex: "sk_domisili",
            render: (record) => record.name,
          },
          {
            title: "NIK",
            key: "nik",
            dataIndex: "sk_domisili",
            render: (record) => record.nik,
          },
          {
            title: "Alamat",
            key: "address",
            dataIndex: "sk_domisili",
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
                    navigate(`/my-sk/domisili/${record.id}/detail`)
                  }
                />
              </Space>
            ),
          },
        ]}
        filterComponents={
          <MySKDomisiliFilter handleOptionalChange={handleOptionalChange} />
        }
        actionComponent={
          <Button
            type="primary"
            onClick={() => navigate("/request-sk/domisili")}
          >
            Ajukan SK Domisili
          </Button>
        }
        isLoading={userSkDomisiliIsLoading}
        withSearch
        data={userSkDomisili?.data}
        onSearchChange={(v) => handleSearchChange(v)}
        withQuickPageJumper
        sort={paginateRequest.sort}
        orderBy={paginateRequest.orderBy}
        total={userSkDomisili?.meta?.total}
        pageSize={paginateRequest.limit}
        currentPage={paginateRequest.page}
        onPageChange={handlePageChange}
        pageSizeOptions={[2, 25, 30, 100]}
      />
    </Card>
  );
};

export default MySKDomisiliTable;
