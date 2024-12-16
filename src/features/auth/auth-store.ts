import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type UserType = "doctor" | "super_admin";

interface AuthStoreState {
  token: string | null;
  info: UserType | null;
}

interface AuthStoreActions {
  setToken(_token: string | null): void;
  setInfo(_info: UserType | null): void;
}

const useAuthStore = create<AuthStoreState & AuthStoreActions>()(
  persist(
    set => ({
      token: null,
      setToken(token) {
        set(() => ({ token }));
      },
      info: null,
      setInfo(info) {
        set(() => ({ info }));
      }
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export default useAuthStore;
