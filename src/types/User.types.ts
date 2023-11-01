export type User = {
    id: string,
    firstName: string,
    lastName: string,
    address: Address;
    email?: string,
    phone?: string,
    admin: boolean,
    password?: string,
    authId: string,
}

export type Address = {
    streetName: string,
    streetNumber: string,
    zipcode: number,
    city: string,
}