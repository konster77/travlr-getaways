export interface Trip {
  _id?: string;
  code: string;
  name: string;
  length: number;
  start: string;       // ISO string
  resort?: string;
  perPerson: number;
  image?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}
