export interface Ticket {
  id?: string;
  name: string;
  email: string;
  description: string;
  status: "new" | "in-progress" | "resolved";
}
