import ApprovalsTag from "@/components/atoms/approvals-tag/ApprovalsTag";
import { BaseTable } from "@/components/molecules/table";
import { useTableAsync } from "@/hooks";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { useGetUserSkTidakMampu } from "@/services/sk-tidak-mampu.service";
import { Button, Card, Space } from "antd";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useNavigate } from "react-router";
import MySKTidakMampuFilter from "./MySKTidakMampuFilter";

const MySKTidakMampuTable = () => {
  const {
    paginateRequest,
    handleSearchChange,
    handlePageChange,
    handleOptionalChange,
  } = useTableAsync<{
    fromDate: string;
    toDate: string;
  }>({});
  const { data: userSkTidakMampu, isLoading: userSkTidakMampuIsLoading } =
    useGetUserSkTidakMampu(paginateRequest);

  const navigate = useNavigate();

  return (
    <Card>
      <BaseTable<ISuratKeterangan>
        columns={[
          {
            title: "Nama Pemohon",
            key: "applicant_name",
            dataIndex: "sk_tidak_mampu",
            render: (record) => record.name,
          },
          {
            title: "NIK",
            key: "nik",
            dataIndex: "sk_tidak_mampu",
            render: (record) => record.nik,
          },
          {
            title: "Alamat",
            key: "address",
            dataIndex: "sk_tidak_mampu",
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
            dataIndex: "id",
            fixed: "right",
            render: (record) => (
              <Space>
                <Button
                  type="link"
                  onClick={() =>
                    navigate(`/my-sk/tidak-mampu/${record}/detail`)
                  }
                >
                  Detail
                </Button>
              </Space>
            ),
          },
        ]}
        filterComponents={
          <MySKTidakMampuFilter handleOptionalChange={handleOptionalChange} />
        }
        actionComponent={
          <Button
            type="primary"
            onClick={() => navigate("/request-sk/tidak-mampu")}
          >
            Ajukan SK Tidak Mampu
          </Button>
        }
        isLoading={userSkTidakMampuIsLoading}
        withSearch
        data={userSkTidakMampu?.data}
        onSearchChange={(v) => handleSearchChange(v)}
        withQuickPageJumper
        sort={paginateRequest.sort}
        orderBy={paginateRequest.orderBy}
        total={userSkTidakMampu?.meta?.total}
        pageSize={paginateRequest.limit}
        currentPage={paginateRequest.page}
        onPageChange={handlePageChange}
        pageSizeOptions={[2, 25, 30, 100]}
      />
    </Card>
  );
};

export default MySKTidakMampuTable;
