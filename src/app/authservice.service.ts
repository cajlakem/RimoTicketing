import { Injectable } from '@angular/core'
import { User } from './_models/User'

@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  currentUser: User | null

  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!)
  }

  public loginUser(userData: any) {
    var aUser = new User()
    aUser.userName = userData.get('user')
    aUser.password = userData.get('password')
    if (aUser.userName != 'emir') {
      return null
    }
    console.log(aUser.userName)
    this.currentUser = aUser
    localStorage.setItem('currentUser', JSON.stringify(aUser))
    return aUser
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
