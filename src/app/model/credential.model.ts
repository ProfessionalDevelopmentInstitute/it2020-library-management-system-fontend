import {LibrarianModel} from './librarian.model';

export class CredentialModel{
  id?: number;
  email: string;
  password: string;
  role: string;
  user: LibrarianModel;
}
