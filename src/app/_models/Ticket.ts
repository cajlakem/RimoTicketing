import { Contact } from './Contact'
import { Contract } from './Contract'
import { EnumList } from './EnumList'
import { Reporter } from './Reporter'
import { TicketComment } from './TicketComment'
import { User } from './User'

export class Ticket {
  [x: string]: any
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
  contacts: Contact[]
  creationTime: string
  type: EnumList
  notes: TicketComment[]
  isOpenAble: boolean
  isNotPending: boolean
  isClosed: boolean
  isReadByQueryTicketReporter: boolean
  getTicketingContract: Contract
}
