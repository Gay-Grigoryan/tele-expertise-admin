export interface Conversation {
  application_id: number;
  contract: string | null;
  id: number;
  message: string | null;
  date: string;
  is_seen: boolean;
  doctor: {
    name: string;
    phone: string;
    id: string;
  };
}
