import { ServiceTypes } from "@/features/services/enums";
import ApiSlice from "../slice";
import { Conversation } from "@/features/chat/types";
import { Message } from "@/common/hooks/socket";

export default class ServicesSlice extends ApiSlice {
  static baseURL: string = ApiSlice.baseURL + "/services";
  static defaultAuth: boolean = true;

  static GetUnseenMessagesForAllServices() {
    return this.request<Record<ServiceTypes, boolean>>("/conversations/unseen");
  }

  static GetServiceConversations(serviceType: ServiceTypes, query: string) {
    return this.request<{ items: Conversation[] }>(`/conversations?service_type=${serviceType}&query=${query}`);
  }
  static GetServiceMessages(serviceType: ServiceTypes, id: string, page: number) {
    return this.request<{ items: Message[]; pages: number }>(
      `/chat/admin/messages?service_type=${serviceType}&user_id=${id}&page=${page}`
    );
  }
  static GetChatFiles(serviceType: ServiceTypes, id: string) {
    return this.request<{
      items: {
        id: number;
        file: string;
      }[];
    }>(`/chat/admin/files?service_type=${serviceType}&user_id=${id}`);
  }
  static DeleteServiceConversation(serviceType: ServiceTypes, id: string) {
    return this.request(`/chat/admin/delete`, "PATCH", { service_type: serviceType, user_id: id });
  }
  static UploadChatFile(payload: FormData) {
    return this.request("/chat/admin/send-file", "POST", payload);
  }
}
