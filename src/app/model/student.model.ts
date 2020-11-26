import {LibraryCardModel} from './library-card.model';
import {ResponseModel} from './response.model';

export interface StudentModel {
  id?: number;
  name: string;
  phone: string;
  address: string;
  email: string;
  dateOfBirth: Date;
  rollNo: string;
  password: string;
  role: string;
  libraryCardRollNo: string;
}
export const ROLE: string[] = ['USER'];
