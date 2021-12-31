import { Component, OnInit } from '@angular/core'
import { Ticket } from '../_models/Ticket'
import { CKEditorModule } from 'ckeditor4-angular'
import { Tickets } from '../_models/Tickets'
import { TicketComment } from '../_models/TicketComment'

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css'],
})
export class CreateTicketComponent implements OnInit {
  public editor = CKEditorModule

  public model = {
    editorData: '',
  }

  constructor() {}

  public ticket: Ticket = {
    id: '1245',
    name: 'ID12565',
    reporter: 'Emir Cajlakovic',
    state: 'New',
    shortText: 'ich brauche Hilfe!',
    longText: 'Das Problem ist...',
    comments: [new TicketComment()],
  }

  ngOnInit(): void {}

  save(): void {
    Tickets.push(this.ticket)
  }
}
