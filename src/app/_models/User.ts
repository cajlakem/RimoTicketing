import { UserProfile } from "./UserProfile"

export class User {
  id: string
  user: string
  christianName: string
  lastName: string
  active: boolean
  token: string
  email: string
  mobile: string
  password: string
  nameToDisplay: string
  profilePictureUrl: string
  lastLogin: number
  getTicketingUserProfiles: UserProfile[]
  languageString: string;

  public getInitials(): string {
    return this.christianName.charAt(0) + this.lastName.charAt(0)!
  }

  getFullName(): string {
    return this.christianName + ' ' + this.lastName
  }
}
