import {
  App as AntApp,
  type ThemeConfig as ThemeConfigType,
  ConfigProvider as ThemeConfig,
} from "antd";
import type { ReactNode } from "react";

const ThemeProvider = ({
  children,
  themeConfig,
}: {
  themeConfig: ThemeConfigType;
  children: ReactNode;
}) => {
  return (
    <AntApp>
      <ThemeConfig theme={themeConfig}>{children}</ThemeConfig>
    </AntApp>
  );
};

export default ThemeProvider;
