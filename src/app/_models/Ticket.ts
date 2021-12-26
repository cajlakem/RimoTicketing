import { TicketComment } from "./TicketComment";

export class Ticket {
  id: string;
  state: string;
  name: string;
  reporter: string;
  shortText: String;
  longText: String;
  comments: TicketComment[];
}
