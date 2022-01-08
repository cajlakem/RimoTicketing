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
  getUserProfilesMITAsString: string | null
  profilePictureUrl: string

  public getInitials(): string {
    return this.christianName.charAt(0) + this.lastName.charAt(0)!
  }

  getFullName(): string {
    return this.christianName + ' ' + this.lastName
  }
}
