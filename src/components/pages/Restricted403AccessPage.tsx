import { ReactNode } from 'react';
import { Button, Layout, Result } from 'antd';

export const Restricted403AccessPage = ({
  logo,
  dashboardUrl,
}: {
  logo?: ReactNode;
  dashboardUrl?: string;
}) => {
  return (
    <Layout className="h-screen w-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg flex flex-col md:flex-row mx-6 md:mx-0">
        <div>
          {logo}
          <Result
            status="403"
            title="403 Unauthorized"
            subTitle="Sorry, you are not authorized to access this page."
            extra={
              <Button href={dashboardUrl ?? '/'} type="primary">
                Back to Dashboard Page
              </Button>
            }
          />
        </div>
      </div>
    </Layout>
  );
};
