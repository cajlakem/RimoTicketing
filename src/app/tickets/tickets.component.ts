import { Component, OnInit } from '@angular/core';
import { Ticket } from '../_models/Ticket';
import { Tickets } from '../_models/Tickets';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  constructor() { }
  ticket = "Meine Tickets";

  ngOnInit(): void {
  }

  tickets = Tickets; 

}
