import {CredentialModel} from './credential.model';

export class LibrarianModel{
  id?: number;
  name: string;
  phone: string;
  address: string;
  email: string;
  position: string;
  password: string;
  role: string;
  user?: LibrarianModel;
}
export const ROLES: string[] = ['ADMIN'];
export const POSITION: string[] = ['Teacher', 'Clerk']
