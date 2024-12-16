import ApiSlice from "../slice";

export interface Admin {
  id: string;
  name: string;
  email: string;
  phone: string;
  countryId: number;
  cityId: number;
  hospital_id: number;
  profession_id: number;
}
export interface Notification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
}

export default class AdminsSlice extends ApiSlice {
  static GetNotifications(): { data: any } | PromiseLike<{ data: any }> {
    throw new Error("Method not implemented.");
  }
  static baseURL: string = ApiSlice.baseURL + "/doctors";
  static defaultAuth: boolean = true;

  static GetAdmins(
    page: number,
    rowsPerPage: number,
    query: string,
    countryId: number | null,
    cityId: number | null,
    hospitalId: number | null,
    professionId: number | null
  ) {
    return this.request<{ items: Admin[] }>(
      `?page=${page}&rows_per_page=${rowsPerPage}&query=${query}${countryId ? `&country_id=${countryId}` : ""}${
        cityId ? `&city_id=${cityId}` : ""
      }${hospitalId ? `&hospital_id=${hospitalId}` : ""}${professionId ? `&profession_id=${professionId}` : ""}`
    );
  }

  static GetAdmin(id: string) {
    return this.request<{ item: Admin }>(`/${id}`);
  }

  static DeleteAdmin(id: string) {
    return this.request(`/${id}`, "DELETE");
  }
  static UpdateAdmin(id: string, data: Partial<Admin | { password: string }>) {
    return this.request(`/${id}`, "PUT", data);
  }
  static CreateAdmin(data: Omit<Admin, "id" | "countryId" | "cityId"> & { password: string }) {
    return this.request("", "POST", data);
  }

  static GetDoctorConversations() {
    return this.request<{ items: any }>(`/chat/conversations`);
  }

  static GetMessages(receiverId: string, page: number) {
    return this.request<{ items: any; pages: number }>(`/${receiverId}/chat/messages?page=${page}`);
  }

  static GetChatFiles(receiverId: string) {
    return this.request<{
      items: {
        id: number;
        file: string;
      }[];
    }>(`/files?receiver_id=${receiverId}`);
  }

  static UploadChatFile(receiverId: string, payload: FormData) {
    return this.request(`/${receiverId}/chat/send-file`, "POST", payload);
  }
}
