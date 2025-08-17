import { QueryClientProvider } from "@tanstack/react-query";
import { setDefaultOptions } from "date-fns";
import { id } from "date-fns/locale";
import * as ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router";
import { query } from "./libs/query";
import ThemeProvider from "./providers/ThemeProvider";
import { router } from "./routes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

setDefaultOptions({ locale: id });
root.render(
  <QueryClientProvider client={query}>
    <HelmetProvider>
      <ThemeProvider
        themeConfig={{
          token: {
            wireframe: false,
            borderRadius: 16,
            colorPrimary: "#002868",
          },
        }}
      >
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  </QueryClientProvider>
);
