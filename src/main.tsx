import { QueryClientProvider } from "@tanstack/react-query";
import * as ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router";
import ThemeProvider from "./providers/ThemeProvider";
import { query } from "./libs/query";
import { router } from "./routes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <QueryClientProvider client={query}>
    <HelmetProvider>
      <ThemeProvider
        themeConfig={{
          token: {
            wireframe: false,
            borderRadius: 16,
            colorPrimary: "#8674b9",
          },
        }}
      >
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  </QueryClientProvider>
);
