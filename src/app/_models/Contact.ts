export class Contact {
    userName: string
    firstName: string
    lastName: string
    email: string

    public getInitials(): string {
        return this.firstName.charAt(0) + this.lastName.charAt(0)
    }

    getFullName(): string {
        return this.firstName + ' ' + this.lastName
    }
}
