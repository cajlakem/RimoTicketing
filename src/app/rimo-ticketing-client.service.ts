import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Ticket } from './_models/Ticket'

@Injectable({
  providedIn: 'root',
})
export class RimoTicketingClientService {
  private url =
    'https://rimo-dev.rimo-saas.com/api/MIT/SDRimoTicketingController'

  private token: String =
    '42E05A5B0EDDA0AACB38FC19C4B8E5AA70C4B4B3E6C7297F5A97C0046CC633E3'

  constructor(private http: HttpClient) {}

  public queryOpenTickets(originMIT: string): Observable<Ticket[]> {
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
      requestBody: { originMIT: originMIT },
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
}
