import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Reporter } from 'src/app/_models/Reporter';
import { Ticket } from 'src/app/_models/Ticket';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.css']
})
export class ChangePasswordModalComponent implements OnInit {
  @Output() stateChanged = new EventEmitter<any>()
  createCommentForm: any = FormGroup
  @Input()
  forTicket: Ticket;
  selected: string;
  submitted: boolean = false;
  error: boolean = false
  pw = new FormControl();
  errorMsg: string;

  constructor() { }

  ngOnInit(): void {
  }

  getErrorMessage() {
    if (this.pw.hasError('required')) {
      return 'Passwort eingeben';
    }
    return this.pw.hasError('password') ? 'Passwort inkorrekt' : '';
  }

  onSubmit() {
    this.submitted = true;
    if (this.pw.invalid) {
      return
    }
    if (this.submitted) {

    }

    handleCreationResponse(ticket: Ticket) {
      this.stateChanged.emit(ticket)
      $('#newTicketContact').modal('hide')
      this.ngOnInit()
    }

    handleCreationErrorResponse(error: any) {
      const u = error as HttpErrorResponse
      this.errorMsg = Object.values(u.error)[0] as string
    }
  }
