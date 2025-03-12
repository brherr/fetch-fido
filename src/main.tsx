import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { routeTree } from "./routeTree.gen.ts";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import "./index.css";

async function initAxe() {
  if (import.meta.env.MODE === "development") {
    const axe = await import("@axe-core/react");
    const ReactDOM = await import("react-dom");

    axe.default(React, ReactDOM.default, 1000);
    console.log("axe-core initialized for accessibility testing");
  }
}

initAxe();

const router = createRouter({
  routeTree,
  context: {
    user: undefined,
  },
});

const queryClient = new QueryClient();

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <main>
          <RouterProvider router={router} />
          <Toaster position="top-right" richColors />
        </main>
      </QueryClientProvider>
    </StrictMode>
  );
}
