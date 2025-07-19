import { PageContainer, ProCard } from "@ant-design/pro-components";
import { Skeleton } from "antd";
import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";

type ContentPaperProps = {
  children: ReactNode;
  hideTitle?: boolean;
  isLoading?: boolean;
  title?: string;
  action?: ReactNode;
  translucent?: boolean;
};

const ContentPaper = ({ children, isLoading, title }: ContentPaperProps) => {
  return (
    <>
      {title && (
        <Helmet>
          <title>{isLoading ? "Loading..." : title}</title>
        </Helmet>
      )}
      <PageContainer>
        <ProCard>
          {isLoading ? <Skeleton active paragraph={{ rows: 12 }} /> : children}
        </ProCard>
      </PageContainer>
    </>
  );
};

export { ContentPaper };
