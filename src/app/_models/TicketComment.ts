import { EnumList } from './EnumList'
import { Reporter } from './Reporter'

export class TicketComment {
  externalID: string
  text: String
  reporter: string
  creationDate: string
  creationTime: string
  createdBy: Reporter
  state: EnumList
}
