import {LibraryCardModel} from './library-card.model';
import {CredentialModel} from './credential.model';

export interface StudentModel {
  id?: number;
  name: string;
  phone: string;
  address: string;
  email: string;
  dateOfBirth: Date;
  password?: string;
  role?: string;
  libraryCard: LibraryCardModel;
}
export const ROLE: string[] = ['USER'];
