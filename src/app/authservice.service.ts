import { HttpErrorResponse } from '@angular/common/http'
import { Injectable, ResolvedReflectiveFactory } from '@angular/core'
import { lastValueFrom } from 'rxjs'
import { LicenseServerClientService } from './license-server-client.service'
import { User } from './_models/User'

@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  currentUser: User | null

  constructor(private licenseClient: LicenseServerClientService) {
    this.currentUserloadUserSettingFromLocalStorage()
  }
  currentUserloadUserSettingFromLocalStorage() {
    var userData = JSON.parse(localStorage.getItem('currentUser')!)
    if (userData) {
      this.currentUser = Object.assign(
        new User(),
        JSON.parse(localStorage.getItem('currentUser')!),
      )
    } else this.currentUser = null
  }

  public async loginUser(userData: any) {
    var aUser = new User()
    var error: string | undefined
    aUser.user = userData.get('user')
    aUser.password = userData.get('password')
    const response = this.licenseClient.loginUser(aUser)
    try {
      aUser = await lastValueFrom(await response)
    } catch (e) {
      const u = e as HttpErrorResponse
      error = Object.values(u.error)[0] as string
      throw new Error(error)
    }
    if (error === undefined) {
      this.currentUser = Object.assign(new User(), aUser)
      localStorage.setItem('currentUser', JSON.stringify(aUser))
      return this.currentUser
    } else return error
  }

  public logout() {
    console.log(this.isLoggedIn)
    localStorage.removeItem('currentUser')
    this.currentUser = null
  }

  public isLoggedIn(): boolean {
    return this.currentUser != null
  }

  public getCurrentUser(): User {
    return this.currentUser!
  }
}
