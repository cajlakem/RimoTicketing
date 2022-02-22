import { EnumList } from './EnumList'
import { Reporter } from './Reporter'

export class TicketComment {
  externalID: string
  text: String
  reporter: string
  creationDate: Date
  creationTime: string
  createdBy: Reporter
  state: EnumList
  getTsCreation: number
}
