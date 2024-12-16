import type { Metadata } from "next";
import "./globals.css";
import "react-phone-input-2/lib/style.css";
import ClientOnlySnackbarProvider from "@/common/components/snackbar-provider";
import GlobalLoadingProvider from "@/common/components/global-loading-provider";

export const metadata: Metadata = {
  title: "Hospital Admin Panel",
  description: "Hospital Admin Panel"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex h-[100dvh] w-screen overflow-hidden bg-gray-light">
        <div className="w-full p-4">
          <ClientOnlySnackbarProvider>
            <div className="flex h-full w-full">{children}</div>
          </ClientOnlySnackbarProvider>
        </div>
        <GlobalLoadingProvider />
        <div id="modal-root" />
      </body>
    </html>
  );
}
