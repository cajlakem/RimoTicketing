export class Reporter {
  name: string
  userLabel: string
  nameToDisplay: string
  christianName: string
  mobile: string
  email: string
  department: string
  asOop: BigInteger

  public getInitials(): string {
    return this.christianName.charAt(0) + this.name.charAt(0)
  }

  getFullName(): string {
    return this.christianName + ' ' + this.name
  }
}
