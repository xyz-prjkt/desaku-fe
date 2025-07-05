import { Card, Skeleton, Spin } from 'antd';
import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography } from '../typography';

type ContentPaperProps = {
  children: ReactNode;
  hideTitle?: boolean;
  isLoading?: boolean;
  title?: string;
  action?: ReactNode;
  translucent?: boolean;
};

const ContentPaper = ({
  children,
  isLoading,
  title,
  hideTitle,
  action,
  translucent = true,
}: ContentPaperProps) => {
  return (
    <>
      {title && (
        <Helmet>
          <title>{isLoading ? 'Loading...' : title}</title>
        </Helmet>
      )}
      <Spin spinning={isLoading || false}>
        <Card
          variant="borderless"
          className={`${
            translucent ? 'bg-white/40 backdrop-blur-2xl' : 'bg-white/85'
          }`}
        >
          {title && !hideTitle && (
            <div className="flex md:flex-row flex-col justify-between  mb-3">
              <Typography.H3>{isLoading ? 'Loading...' : title}</Typography.H3>
              {action}
            </div>
          )}
          {isLoading ? <Skeleton active paragraph={{ rows: 12 }} /> : children}
        </Card>
      </Spin>
    </>
  );
};

export { ContentPaper };
