export type User = {
    customerId: number,
    firstName: string,
    lastName: string,
    address: Address;
    email: string,
    phone: string,
    admin: boolean,
    password: string,
}

export type Address = {
    streetName: string,
    streetNumber: string,
    zipCode: number,
    city: string,
}