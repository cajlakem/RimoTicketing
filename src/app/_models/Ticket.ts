import { EnumList } from './EnumList'
import { Reporter } from './Reporter'
import { TicketComment } from './TicketComment'
import { User } from './User'

export class Ticket {
  id: string
  state: EnumList
  name: string
  assignedTo: User
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
  isOpenAble: boolean
  isNotPending: boolean
  isClosed: boolean
  hasReadByRequestor: boolean
}
