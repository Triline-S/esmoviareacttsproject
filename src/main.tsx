import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { MyProvider } from "./app/ProviderContextComponent.tsx";
import "./index.css"

import { BrowserRouter } from "react-router-dom";

import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MyProvider>
        <MantineProvider>
          <App />
        </MantineProvider>
      </MyProvider>
    </BrowserRouter>
  </React.StrictMode>
);
