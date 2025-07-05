import { ContentPaper } from "@/components/atoms/paper";
import { Typography } from "@/components/atoms/typography";
import { Card, Space, Statistic } from "antd";

const VillagerDashboardPage = () => {
  return (
    <ContentPaper title="Dashboard">
      <Space direction="vertical" size="large" className="w-full">
        <Card variant="borderless">
          <Statistic title="Surat Diterima" />
        </Card>
        <Card variant="borderless">
          <Typography.H4 subtitle="Riwayat surat yang telah di verifikasi">
            Riwayat Permintaan Surat
          </Typography.H4>
        </Card>
      </Space>
    </ContentPaper>
  );
};

export default VillagerDashboardPage;
