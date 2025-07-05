import { ReactNode } from 'react';
import { Button, Layout, Result } from 'antd';

export const Unauthorized401Page = ({
  logo,
  authorizatonUrl = 'http://localhost:4201',
}: {
  logo?: ReactNode;
  authorizatonUrl?: string;
}) => {
  return (
    <Layout className="h-screen w-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg flex flex-col md:flex-row mx-6 md:mx-0">
        <div>
          {logo}
          <Result
            status="403"
            title="401 Unauthorized"
            subTitle="Sorry, you are not authorized to access this page."
            extra={
              <Button href={authorizatonUrl} type="primary">
                Back Authorization Page
              </Button>
            }
          />
        </div>
      </div>
    </Layout>
  );
};
