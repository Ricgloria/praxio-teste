export interface User {
  name: string;
  cpf: string;
  phone: string;
  email: string;
  password: string;
  address: Address;
}

export interface Address {
  zipcode: string;
  street: string;
  number: string;
  neighborhood: string;
}
