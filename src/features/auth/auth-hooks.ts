import { useRouter } from "next/navigation";
import useAuthStore from "./auth-store";
import { useLayoutEffect } from "react";

export function useAvoidAuthenticated(fallbackPageUrl: string) {
  const router = useRouter();
  const navigate = router.push;

  const { isLoggedIn } = useAuthStore(state => ({
    isLoggedIn: Boolean(state.info && state.token)
  }));

  useLayoutEffect(() => {
    if (isLoggedIn) {
      navigate(fallbackPageUrl);
    }
  }, [isLoggedIn, navigate, fallbackPageUrl]);
}
