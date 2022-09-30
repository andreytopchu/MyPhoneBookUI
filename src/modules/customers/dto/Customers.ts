export interface ICustomer {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  phones: IPhone[];
  address: IAddress;
  groups: IGroup[];
  email: string;
  gender: 'None' | 'Male' | 'Female';
  imageUrl: string;
  dateOfBirth: string;
}

export interface IPhone {
  phoneNumber: string;
  category: IGroup;
}

interface IAddress {
  region: string;
  city: string;
  street: string;
  house: number;
  block: string;
  flat: number;
}

export interface IGroup {
  id: string;
  name: string;
}
