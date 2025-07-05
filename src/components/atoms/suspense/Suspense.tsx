import { Suspense as ReactSuspense, ReactNode } from 'react';
import { Spin } from 'antd';

const Suspense = ({ children }: { children: ReactNode }) => (
  <ReactSuspense fallback={<Spin className="z-50" fullscreen spinning />}>
    {children}
  </ReactSuspense>
);

export { Suspense };
