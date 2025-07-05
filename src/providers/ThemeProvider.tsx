import {
  App as AntApp,
  ConfigProvider as ThemeConfig,
  type ThemeConfig as ThemeConfigType,
} from "antd";
import id_ID from "antd/locale/id_ID";
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
      <ThemeConfig theme={themeConfig} locale={id_ID}>
        {children}
      </ThemeConfig>
    </AntApp>
  );
};

export default ThemeProvider;
