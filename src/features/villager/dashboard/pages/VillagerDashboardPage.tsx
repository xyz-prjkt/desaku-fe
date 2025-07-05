import { ContentPaper } from "@/components/atoms/paper";
import { BaseTable } from "@/components/molecules/table";
import { SK_TYPE_MAP } from "@/constants/sk-type-map";
import { STATUS_COLOR_MAP } from "@/constants/status-color";
import { STATUS_MAP } from "@/constants/status-map";
import { useTableAsync } from "@/hooks";
import { IUserSk } from "@/interfaces/services/dashboard";
import {
  useGetDashboardStatusCount,
  useGetMySkList,
} from "@/services/dashboard.service";
import { Card, Space, Statistic, Tag } from "antd";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import VillagerDashboardFilter from "../components/VillagerDashboardFilter";
import { formatter } from "@/components/atoms/count-up";

const VillagerDashboardPage = () => {
  const {
    paginateRequest,
    handleOptionalChange,
    handleSearchChange,
    handleSortChange,
    handlePageChange,
  } = useTableAsync<{
    fromDate: string;
    toDate: string;
  }>({});

  const { data: statusCount, isLoading: statusCountIsLoading } =
    useGetDashboardStatusCount();

  const { data: userSkList, isLoading: userSkListIsLoading } =
    useGetMySkList(paginateRequest);

  const statusItems = [
    {
      title: "Menunggu Verifikasi",
      value: statusCount?.data?.verify || 0,
      color: "#faad14",
    },
    {
      title: "Disetujui",
      value: statusCount?.data?.approved || 0,
      color: "#52c41a",
    },
    {
      title: "Ditolak",
      value: statusCount?.data?.rejected || 0,
      color: "#ff4d4f",
    },
    {
      title: "Direvisi",
      value: statusCount?.data?.revised || 0,
      color: "#1890ff",
    },
  ];

  return (
    <ContentPaper title="Dashboard">
      <Space direction="vertical" size="large" className="w-full">
        <div className="flex flex-wrap gap-4">
          {statusItems.map((item, index) => (
            <Card
              key={index}
              variant="borderless"
              className="flex-1 min-w-[200px] max-w-[300px]"
            >
              <Statistic
                title={item.title}
                value={item.value}
                valueStyle={{ color: item.color }}
                loading={statusCountIsLoading}
                formatter={formatter}
              />
            </Card>
          ))}
        </div>
        <Card variant="borderless">
          <BaseTable<IUserSk>
            isLoading={userSkListIsLoading}
            columns={[
              {
                title: "Jenis Surat",
                dataIndex: "sk_type",
                key: "sk_type",
                render: (value) => SK_TYPE_MAP[value] || value,
              },
              {
                title: "Nama di Surat",
                render: (_, record) => {
                  if (record.sk_type === "KEMATIAN") {
                    return record.sk_kematian.name;
                  } else if (record.sk_type === "TIDAK_MAMPU") {
                    return record.sk_tidak_mampu.name;
                  } else {
                    ("-");
                  }
                },
              },
              {
                title: "Status",
                render: (_, record) => {
                  const approvals = record.user_approvers || [];

                  if (approvals.length === 0) {
                    return <Tag color="orange">Menunggu Verifikasi</Tag>;
                  }

                  return (
                    <div className="flex flex-wrap flex-col gap-1">
                      {approvals.map((approval, index) => (
                        <Tag
                          className="w-fit"
                          key={index}
                          color={STATUS_COLOR_MAP[approval.status] || "default"}
                        >
                          {approval.approver.name}:{" "}
                          {STATUS_MAP[approval.status] || approval.status}
                        </Tag>
                      ))}
                    </div>
                  );
                },
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
            ]}
            withSearch
            filterComponents={
              <VillagerDashboardFilter
                handleOptionalChange={handleOptionalChange}
              />
            }
            onSearchChange={(v) => handleSearchChange(v)}
            data={userSkList?.data}
            withQuickPageJumper
            onSortChange={handleSortChange}
            sort={paginateRequest.sort}
            orderBy={paginateRequest.orderBy}
            total={userSkList?.meta?.total}
            pageSize={paginateRequest.limit}
            currentPage={paginateRequest.page}
            onPageChange={handlePageChange}
            pageSizeOptions={[2, 25, 30, 100]}
          />
        </Card>
      </Space>
    </ContentPaper>
  );
};

export default VillagerDashboardPage;
