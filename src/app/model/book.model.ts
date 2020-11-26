import {Shelf} from './shelf.model';
import {BookCategory} from './category.model';

export interface BookModel {
  id?: number;
  name: string;
  author: string;
  edition: string;
  imgUrl?: string;
  isbn?: string;
  price: number;
  categories: BookCategory;
  shelves: Shelf;
}
