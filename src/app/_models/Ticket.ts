import { EnumList } from './EnumList'
import { Reporter } from './Reporter'
import { TicketComment } from './TicketComment'

export class Ticket {
  id: string
  state: EnumList
  name: string
  reporter: Reporter
  priority: EnumList
  shortText: string
  longText: String
  creationDate: string
  requestor: Reporter
  originMIT: string
  contacts: Reporter[]
  creationTime: string
  type: EnumList
  notes: TicketComment[]
}
