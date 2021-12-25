import { Component, OnInit } from '@angular/core';
import { Ticket } from '../_models/Ticket';
import { CKEditorModule } from 'ckeditor4-angular';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {
  public editor = CKEditorModule;

  public model = {
    editorData: '<p>Hello, world!</p>'
};

  constructor() { }

  ticket: Ticket = {
    id: "1245",
    name: "ID12565",
    reporter: "Emir Cajlakovic",
    state: "New"
  }

  ngOnInit(): void {
  }

}
