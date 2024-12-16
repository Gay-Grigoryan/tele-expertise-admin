import { LengthTypes, ProcessingTypes, StoneTypes, ThicknessTypes, WidthTypes } from "@/common/types/enums";
import ApiSlice from "../slice";

export interface OrderInfoType<T> {
  id: number;
  type: T;
}

export interface UserInfo {
  a_count: number;
  r_count: number;
  i_count: number;
  monthly_data: {
    month: number;
    r_count: number;
    a_count: number;
    i_count: number;
  }[];
}

export interface IdName {
  id: number;
  name: string;
}

export default class CommonSlice extends ApiSlice {
  static baseURL: string = ApiSlice.baseURL;

  static GetCountries() {
    return this.request<IdName[]>("/countries");
  }

  static GetCities(countryId: number) {
    return this.request<IdName[]>(`/cities?country_id=${countryId}`);
  }

  static GetHospitals(cityId: number) {
    return this.request<IdName[]>(`/hospitals?city_id=${cityId}`);
  }

  static GetProfessions(hospitalId: number) {
    return this.request<IdName[]>(`/professions?hospital_id=${hospitalId}`);
  }
}
