import { Contract } from './Contract'
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
  isSolved: boolean
  isReadByQueryTicketReporter: boolean
  getTicketingContract: Contract
  tsCreation: number
  canBeModifiedByUser: boolean

  reverseTicketNotes(notes: TicketComment[]) {
    notes.sort(function (a, b) {
      var aDate = new Date(a.getTsCreation * 1000)
      var bDate = new Date(b.getTsCreation * 1000)
      return bDate.getTime() - aDate.getTime();
    });
    return notes;
  }

  replaceAllAscii(shortLongText: string) {
    var a = shortLongText.split('Ã¤').join("ä");
    var b = a.split('Ã¼').join("ö");
    var c = b.split('Ã¶').join("ü");
    var d = c.split('Ã\x84').join("Ä");
    var e = d.split('Ã\x96').join("Ö");
    var f = e.split('Ã\x9C').join("Ü");
    return f;
  }

}
