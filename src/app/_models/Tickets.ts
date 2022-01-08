import { EnumList } from './EnumList'
import { Reporter } from './Reporter'
import { Ticket } from './Ticket'
import { TicketComment } from './TicketComment'
import { User } from './User'

export const Tickets: Ticket[] = [
  {
    id: '1245',
    name: 'ID12565',
    assignedTo: new User(),
    shortText: 'ich brauche Hilfe!',
    state: new EnumList(),
    priority: new EnumList(),
    requestor: new Reporter(),
    originMIT: '',
    contacts: [new Reporter()],
    creationTime: '',
    creationDate: '',
    longText: 'sss',
    type: new EnumList(),
    notes: [new TicketComment()],
  },
]
