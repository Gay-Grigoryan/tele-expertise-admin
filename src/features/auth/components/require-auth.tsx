"use client";

import { useRouter } from "next/navigation";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { withClientOnly } from "@/common/components/client-only";
import ApiSlice from "@/api/slice";
import useAuthStore from "../auth-store";

function RequireAuth({ children, navigateToUsersPage }: PropsWithChildren<{ navigateToUsersPage?: boolean }>) {
  const router = useRouter();
  const navigate = router.push;
  const [tokenIsSetForApi, setTokenIsSetForApi] = useState(false);

  const { isLoggedIn, userType, token } = useAuthStore(state => ({
    isLoggedIn: Boolean(state.token && state.info),
    userType: state.info,
    token: state.token
  }));

  // go to /users if logged in
  // else /login
  useEffect(() => {
    if (isLoggedIn) {
      if (navigateToUsersPage) {
        if (userType === "doctor") {
          navigate("/doctor-chats");
        } else {
          navigate("/doctors");
        }
      }
    } else {
      navigate("/login");
    }
  }, [isLoggedIn, userType, navigate, navigateToUsersPage]);

  // check the token in api slice
  useEffect(() => {
    if (token) {
      if (!ApiSlice.token) {
        ApiSlice.setToken(token);
      }
      setTokenIsSetForApi(true);
    }
  }, [token]);

  return isLoggedIn && tokenIsSetForApi ? <>{children}</> : <></>;
}

export default withClientOnly(RequireAuth);
