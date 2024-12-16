import ApiSlice from "./slice";
import AdminsSlice from "./slices/doctors";
import AuthSlice from "./slices/auth";
import CommonSlice from "./slices/common";
import DoctorsSlice from "./slices/doctors";

class Api extends ApiSlice {
  static auth = AuthSlice;
  static common = CommonSlice;
  static doctors = DoctorsSlice;
  static admins = AdminsSlice;
}

export default Api;
