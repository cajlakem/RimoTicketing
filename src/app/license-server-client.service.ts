import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http'
import { User } from './_models/User'
import { map, Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class LicenseServerClientService {
  private url =
    'https://' +
    (environment.apiLicenseServer as string) +
    '/api/MIT/SDRimoWebGlobalLicenseRestService'

  private token: String = environment.apiLicenseServerToken as string

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
