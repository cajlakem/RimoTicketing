import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http'
import { User } from './_models/User'
import { map, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class LicenseServerClientService {
  private url =
    'http://rimo-dev.rimo-saas.com/api/MIT/SDRimoWebGlobalLicenseRestService'

  private userName: String = 'license_server_client'
  private token: String =
    '42E05A5B0EDDA0AACB38FC19C4B8E5AA70C4B4B3E6C7297F5A97C0046CC633E3'

  constructor(private http: HttpClient) {}

  async loginUser(user: User): Promise<Observable<any>> {
    const headers = { 'content-type': 'application/json' }
    let body = {
      operation: 'checkLogin',
      token: this.token,
      appName: null,
      tsSend: null,
      tsReceived: null,
      queue: null,
      asOop: null,
      errorText: null,
      requestBody: {
        user: user.user,
        password: user.password,
        plainPW: true,
      },
      responseBody: {},
    }
    return this.http
      .post<User>(this.url, body, {
        headers: headers,
      })
      .pipe(map((res) => res))
  }
}
