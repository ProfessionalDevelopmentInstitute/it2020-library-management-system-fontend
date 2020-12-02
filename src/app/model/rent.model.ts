import {StudentModel} from './student.model';
import {BookModel} from './book.model';
import {LibrarianModel} from './librarian.model';

export class RentModel{
  id?: number;
  rentFromDate: Date;
  rentToDate: Date;
  returnDate: Date;
  fine: number;
  status: string;
  student: StudentModel;
  book: BookModel;
  librarian: LibrarianModel;
}

export const STATUS: string[] = ['Pending', 'Accessed']

