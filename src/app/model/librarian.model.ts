export class LibrarianModel{
  id?: number;
  name: string;
  phone: string;
  address: string;
  email: string;
  position: string;
  password: string;
  role: string;
}
export const ROLE: string[] = ['ADMIN'];
export const POSITION: string[] = ['Teacher', 'Clerk']
