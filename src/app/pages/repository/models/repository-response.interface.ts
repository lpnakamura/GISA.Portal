export interface RepositoryResponse {
  id: string;
  before: Before;
  after: After;
  operation: string;
  createdOn: Date;
  updatedOn: Date;
  removedOn: Date;
}

export interface Member {
  id: string;
  name: string;
  socialName: string;
  maritalStatus: string;
  gender: string;
  birthDay: Date;
  nationality: string;
  personIdentifier: string;
  address: string;
  addressNumber: string;
  addition: string;
  zipCode: string;
  emailAddress: string;
  phoneNumber: string;
  mobileNumber: string;
  height: number;
  weigth: number;
  bloodType: string;
  skinColor: string;
}

export interface Provider {
  id: string;
  name: string;
  maritalStatus: string;
  birthDay: Date;
  nationality: string;
  professionalIdentifier: string;
  address: string;
  addressNumber: string;
  addition: string;
}

export interface PlanType {
  id: string;
  title: string;
}

export interface City {
  id: string;
  name: string;
  state: string;
  latitude: number;
  longitude: number;
}

export interface Ocupation {
  id: string;
  title: string;
}

export interface Before {
  member?: Member;
  provider?: Provider;
  planType: PlanType;
  city: City;
  ocupation: Ocupation;
}

export interface After {
  member?: Member;
  provider?: Provider;
  planType: PlanType;
  city: City;
  ocupation: Ocupation;
}
