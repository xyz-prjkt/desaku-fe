import { ReactNode } from 'react';
import { Button, Layout, Result } from 'antd';

export const NotFound404Page = ({
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
            status="404"
            title="404 Not Found"
            subTitle="Sorry, the page you request was not found."
            extra={
              <Button href={dashboardUrl ?? '/'} type="primary">
                Back to Main Page
              </Button>
            }
          />
        </div>
      </div>
    </Layout>
  );
};
