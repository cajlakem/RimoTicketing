import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { Reporter } from './_models/Reporter'
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

  headers = { 'content-type': 'application/json' }


  constructor(private http: HttpClient) { }

  public queryOpenTickets(
    user: User,
    filterKey: string
  ): Observable<Ticket[]> {
    var contractIds: string[] = [];
    for (let contracts of user.getUserProfiles) {
      contractIds.push(contracts.tenant.id)
    }

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
      requestBody: { externalIDContracts: contractIds, filterKey: filterKey, userNameTicketingUser: user.user },
      responseBody: {},
    }
    return this.http.post<Ticket[]>(this.url, body, {
      headers: headers,
    })
  }

  public queryTicketWithlId(id: string): Observable<Ticket> {
    var body = {
      operation: 'queryTicketWithlId',
      token: this.token,
      requestBody: { id: id },
      responseBody: {},
    }

    return this.http.post<Ticket>(this.url, body, {
      headers: this.headers,
    })
  }

  public createTicket(
    text: string,
    subject: string,
    prio: string,
    contract: string,
    reporter: User,
  ): Observable<Ticket> {
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
        externalIDContract: contract,
        prio: prio,
        userNameTicketingUser: reporter.user
      },
      responseBody: {},
    }

    return this.http.post<Ticket>(this.url, body, {
      headers: this.headers,
    })
  }

  public deleteTicket(ticketID: string): Observable<Ticket> {
    var body = {
      operation: 'deleteTicket',
      token: this.token,

      requestBody: {
        ticketID: ticketID,
      },
      responseBody: {},
    }

    return this.http.post<Ticket>(this.url, body, {
      headers: this.headers,
    })
  }

  public changeTicketTitle(
    ticketID: string,
    title: string,
  ): Observable<Ticket> {
    var body = {
      operation: 'changeTicketTitle',
      token: this.token,
      requestBody: {
        ticketID: ticketID,
        ticketTitle: title,
      },
      responseBody: {},
    }

    return this.http.post<Ticket>(this.url, body, {
      headers: this.headers,
    })
  }

  public createNote(
    text: string,
    ticketID: string,
    originMIT: string,
    firstName: string,
    lastName: string,
  ): Observable<Ticket> {
    var body = {
      operation: 'addCommentToTicket',
      token: this.token,
      appName: null,
      tsSend: null,
      tsReceived: null,
      queue: null,
      asOop: null,
      errorText: null,
      requestBody: {
        htmlCommentText: text,
        ticketID: ticketID,
        sendMail: true,
        originMIT: 'MIT_Powerlines_SM',
        firstName: firstName,
        lastName: lastName,
      },
      responseBody: {},
    }

    return this.http.post<Ticket>(this.url, body, {
      headers: this.headers,
    })
  }

  public reOpenTicket(
    ticketID: string,
    rejectText: string,
    originMIT: string,
    firstName: string,
    lastName: string,
  ): Observable<Ticket> {
    var body = {
      operation: 'reOpenTicket',
      token: this.token,
      requestBody: {
        ticketID: ticketID,
        rejectText: rejectText,
        originMIT: 'MIT_Powerlines_SM',
        firstName: firstName,
        lastName: lastName,
      },
      responseBody: {},
    }

    return this.http.post<Ticket>(this.url, body, {
      headers: this.headers,
    })
  }

  public closeTicket(ticketID: string): Observable<Ticket> {
    var body = {
      operation: 'closeTicket',
      token: this.token,
      requestBody: {
        ticketID: ticketID,
      },
      responseBody: {},
    }

    return this.http.post<Ticket>(this.url, body, {
      headers: this.headers,
    })
  }

  public queryContacts(originMIT: string): Observable<Reporter[]> {
    var body = {
      operation: 'queryContacts',
      token: this.token,
      requestBody: {
        originMIT: 'MIT_Powerlines_SM',
      },
      responseBody: {},
    }

    return this.http.post<Reporter[]>(this.url, body, {
      headers: this.headers,
    })
  }

  public changeTicketRequestor(
    originMIT: string,
    firstName: string,
    lastName: string,
    email: string,
    ticketID: string,
    mobile: string,
  ): Observable<Ticket> {
    var body = {
      operation: 'changeTicketRequestor',
      token: this.token,
      requestBody: {
        originMIT: 'MIT_Powerlines_SM',
        firstName: firstName,
        lastName: lastName,
        email: email,
        ticketID: ticketID,
        mobile: mobile,
      },
      responseBody: {},
    }

    return this.http.post<Ticket>(this.url, body, {
      headers: this.headers,
    })
  }

  public addCCReporter(
    originMIT: 'MIT_Powerlines_SM',
    firstName: string,
    lastName: string,
    email: string,
    ticketID: string,
    mobile: string,
  ): Observable<Ticket> {
    var body = {
      operation: 'addCCReporter',
      token: this.token,
      requestBody: {
        ticketID: ticketID,
        reporters: [
          { firstName: firstName, lastName: lastName, company: originMIT },
        ],
      },
      responseBody: {},
    }

    return this.http.post<Ticket>(this.url, body, {
      headers: this.headers,
    })
  }

  public removeCCReporter(
    originMIT: string,
    firstName: string,
    lastName: string,
    email: string,
    ticketID: string,
    mobile: string,
  ): Observable<Ticket> {
    var body = {
      operation: 'removeCCReporter',
      token: this.token,
      requestBody: {
        ticketID: ticketID,
        reporters: [
          { firstName: firstName, lastName: lastName, company: originMIT },
        ],
      },
      responseBody: {},
    }

    return this.http.post<Ticket>(this.url, body, {
      headers: this.headers,
    })
  }
}
