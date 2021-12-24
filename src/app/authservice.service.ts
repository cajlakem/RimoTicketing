import { Injectable } from '@angular/core';
import { User } from './_models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  
  currentUser : User;

  constructor() { }
  
  public loginuser(userData:any)
  {
    var aUser = new User;
    aUser.userName = userData.get('user');
    aUser.password = userData.get('password');
    this.currentUser = aUser;
    return aUser;
  }
}
