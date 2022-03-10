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

  replaceAllAscii() {
    var a = this.text.split('Ã¤').join("ä");
    var b = a.split('Ã¼').join("ö");
    var c = b.split('Ã¶').join("ü");
    var d = c.split('Ã\x84').join("Ä");
    var e = d.split('Ã\x96').join("Ö");
    var f = e.split('Ã\x9C').join("Ü");
    return f;
  }

}
