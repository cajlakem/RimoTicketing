import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { Ticket } from './_models/Ticket'
import { User } from './_models/User'

@Injectable({
  providedIn: 'root',
})
export class RimoTicketingClientService {
  private url =
    'https://' +
    (environment.apiTicketingServer as string) +
    '/api/MIT/SDRimoTicketingController'

  private token: String = environment.apiTicketingServerToken as string

  constructor(private http: HttpClient) {}

  public queryOpenTickets(
    originMIT: string,
    filterKey: string,
  ): Observable<Ticket[]> {
    const headers = { 'content-type': 'application/json' }
    var body = {
      operation: 'queryOpenTickets',
      token: this.token,
      appName: null,
      tsSend: null,

      tsReceived: null,
      queue: null,
      asOop: null,
      errorText: null,
      requestBody: { originMIT: originMIT, filterKey: filterKey },
      responseBody: {},
    }
    return this.http.post<Ticket[]>(this.url, body, {
      headers: headers,
    })
  }

  public queryTicketWithlId(id: string): Observable<Ticket> {
    const headers = { 'content-type': 'application/json' }
    var body = {
      operation: 'queryTicketWithlId',
      token: this.token,
      requestBody: { id: id },
      responseBody: {},
    }

    return this.http.post<Ticket>(this.url, body, {
      headers: headers,
    })
  }

  public createTicket(
    text: string,
    subject: string,
    originMIT: string,
    prio: string,
    type: string,
    firstName: string,
    lastName: string,
    email: string,
    mobile: string,
    reporter: User,
  ): Observable<Ticket> {
    const headers = { 'content-type': 'application/json' }
    var body = {
      operation: 'createTicket',
      token: this.token,
      appName: null,
      tsSend: null,
      tsReceived: null,
      queue: null,
      asOop: null,
      errorText: null,
      requestBody: {
        htmlText: text,
        subject: subject,
        originMIT: reporter.getUserProfilesMITAsString,
        prio: prio,
        firstName: reporter.christianName,
        lastName: reporter.lastName,
        email: reporter.email,
        mobile: reporter.mobile,
        type: type,
      },
      responseBody: {},
    }

    return this.http.post<Ticket>(this.url, body, {
      headers: headers,
    })
  }
}
