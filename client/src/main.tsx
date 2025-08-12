import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthProvider.tsx";
import FormProvider from "./context/FormProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
          <FormProvider>
            <App />
          </FormProvider>
      </AuthProvider>

      <Toaster position="top-right" richColors closeButton />
    </BrowserRouter>
  </StrictMode>
);
