"use client";

import { SnackbarProvider } from "notistack";
import { withClientOnly } from "./client-only";
import { PropsWithChildren } from "react";

function ClientOnlySnackbarProvider({ children }: PropsWithChildren) {
  return (
    <SnackbarProvider preventDuplicate autoHideDuration={2000}>
      {children}
    </SnackbarProvider>
  );
}

export default withClientOnly(ClientOnlySnackbarProvider);
