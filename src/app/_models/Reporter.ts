export class Reporter {
  userLabel: string
  nameToDisplay: string
  christianName: string
  mobile: string
  email: string
  department: string
  asOop: BigInteger
  lastName: string
  userName: string
  info1: string
  id: any

  public getInitials(): string {
    return this.christianName.charAt(0) + this.lastName.charAt(0)
  }

  getFullName(): string {
    return this.christianName + ' ' + this.lastName
  }
}
