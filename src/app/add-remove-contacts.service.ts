import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Reporter } from './_models/Reporter';

@Injectable({
  providedIn: 'root'
})
export class AddRemoveContactsService {
  private subjectName = new Subject<any>()
  constructor() { }

  sendUpdate(newTicketContacts: Reporter[], origin: string) {
    this.subjectName.next({
      newTicketContacts,
      origin
    })
  }

  getUpdate(): Observable<any> {
    return this.subjectName.asObservable()
  }
}