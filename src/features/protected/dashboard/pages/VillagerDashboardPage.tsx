import ApprovalsTag from "@/components/atoms/approvals-tag/ApprovalsTag";
import { AvatarImage } from "@/components/atoms/avatar";
import { formatter } from "@/components/atoms/count-up";
import { ContentPaper } from "@/components/atoms/paper";
import { Typography } from "@/components/atoms/typography";
import { BaseTable } from "@/components/molecules/table";
import { SK_TYPE_MAP } from "@/constants/sk-type-map";
import { useTableAsync } from "@/hooks";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { useGetAuthMe } from "@/services/auth.service";
import {
  useGetDashboardStatusCount,
  useGetMySkList,
} from "@/services/dashboard.service";
import { Button, Card, Space, Statistic, Tag } from "antd";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useNavigate } from "react-router";
import VillagerDashboardFilter from "../components/VillagerDashboardFilter";

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

  const { data: myProfile, isLoading: myProfileIsLoading } = useGetAuthMe();

  const { data: statusCount, isLoading: statusCountIsLoading } =
    useGetDashboardStatusCount();

  const { data: userSkList, isLoading: userSkListIsLoading } =
    useGetMySkList(paginateRequest);

  const navigate = useNavigate();

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
      title: "Memerlukan Revisi",
      value: statusCount?.data?.revised || 0,
      color: "#1890ff",
    },
  ];

  return (
    <ContentPaper title="Dashboard">
      <Space direction="vertical" size="large" className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card
            loading={myProfileIsLoading}
            className="bg-purple-100 lg:col-span-1"
          >
            <div className="flex flex-col gap-4">
              <div className="p-1 w-fit rounded-full border-2 border-spacing-6 border-purple-500 border-dotted">
                <AvatarImage
                  src={""}
                  fallback={myProfile?.data?.name.slice(0, 1)}
                  size={64}
                />
              </div>
              <div className="w-full">
                <Typography.P className="text-purple-800 font-medium text-xl">
                  {myProfile?.data?.name}
                </Typography.P>
                <Typography.P className="text-gray-600 mb-3">
                  {myProfile?.data?.email}
                </Typography.P>
                <div className="flex flex-wrap gap-1">
                  {myProfile?.data?.role.map((role) => (
                    <Tag key={role.id}>{role.name}</Tag>
                  ))}
                </div>
              </div>
            </div>
          </Card>
          <div className="grid grid-cols-2 gap-4 lg:col-span-2">
            {statusItems.map((item, index) => (
              <Card key={index} variant="borderless" className="h-full">
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
        </div>
        <Card variant="borderless">
          <BaseTable<ISuratKeterangan>
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
                    return "-";
                  }
                },
              },
              {
                title: "Status",
                render: (_, record) => (
                  <ApprovalsTag approvers={record.user_approvers} />
                ),
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
                render: (_, record) => (
                  <Button
                    type="link"
                    onClick={() => {
                      const skUrl =
                        record.sk_type === "KEMATIAN"
                          ? "kematian"
                          : record.sk_type === "TIDAK_MAMPU"
                          ? "tidak-mampu"
                          : "";
                      navigate(`/my-sk/${skUrl}/${record.id}/detail`);
                    }}
                  >
                    Detail
                  </Button>
                ),
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
