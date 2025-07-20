import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { UserProvider } from "./context/userContext.jsx";
import { CaptainProvider } from "./context/captainContext.jsx";
import "./index.css";
import App from "./App.jsx";
import { SocketProvider } from "./context/socketContext.jsx";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SocketProvider>
        <CaptainProvider>
          <UserProvider>
            <BrowserRouter>
              <App />
              <Toaster />
            </BrowserRouter>
          </UserProvider>
        </CaptainProvider>
      </SocketProvider>
    </QueryClientProvider>
  </StrictMode>
);
