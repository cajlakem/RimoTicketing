import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Ticket } from '../_models/Ticket';
import { Tickets } from '../_models/Tickets';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ticket : Ticket;

  ngOnInit(): void {
    var id = this.activatedRoute.snapshot.paramMap.get('id');
    var myTicket = Tickets.find(ticket => ticket.id == id)!;
    this.ticket = myTicket;

  }

}
