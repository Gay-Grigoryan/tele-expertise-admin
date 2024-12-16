import type { Metadata } from "next";
import DrawerMenu from "@/features/authenticated-layout/components/drawer-menu";
import RequireAuth from "@/features/auth/components/require-auth";

export const metadata: Metadata = {
  title: "Hospital Admin Panel",
  description: " Hospital Admin Panel"
};

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth>
      <div className="w-full">
        <div className="flex h-full w-full gap-4">
          <div className="h-full w-max">
            <DrawerMenu />
          </div>
          <div className="flex flex-1">{children}</div>
        </div>
      </div>
    </RequireAuth>
  );
}
