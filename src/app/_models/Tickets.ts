import { Ticket } from "./Ticket";
import { TicketComment } from "./TicketComment";

export const Tickets: Ticket[] = [
    {id: "1245",
    name: "ID12565",
    reporter: "Emir Cajlakovic",
    state: "New",
    shortText: "ich brauche Hilfe!",
    longText: "Das Problem ist...",
    comments: [new TicketComment()]},
    {id: "54545",
    name: "ID12565",
    reporter: "Rocco Siffridi",
    state: "inprogress",
    shortText: "schon wieder...",
    longText: "...kann nicht arbeiten weil...",
    comments: [new TicketComment()]}
]