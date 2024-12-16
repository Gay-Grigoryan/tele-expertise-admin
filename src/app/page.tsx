"use client";
import RequireAuth from "@/features/auth/components/require-auth";

export default function Home() {
  return <RequireAuth navigateToUsersPage />;
}
