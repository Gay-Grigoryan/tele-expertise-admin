import { LoginFormValues } from "@/features/auth/components/login-form";
import ApiSlice from "../slice";
import { UserType } from "@/features/auth/auth-store";

export default class AuthSlice extends ApiSlice {
  static baseURL: string = ApiSlice.baseURL + "/auth/admin";

  static Login(payload: LoginFormValues) {
    return this.request<{ token: string; type: UserType }>("/login", "POST", payload);
  }
}
