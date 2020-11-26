import { Component, OnInit } from '@angular/core';
import {Shelf} from '../../model/shelf.model';
import {ShelfService} from '../../service/shelf.service';

@Component({
  selector: 'app-shelves',
  templateUrl: './shelves.component.html',
  styleUrls: ['./shelves.component.css']
})
export class ShelvesComponent implements OnInit {

  shelf: Shelf[];
  constructor(private shelfService: ShelfService) { }

  ngOnInit(): void {
    this.shelfService.getShelves().subscribe(
      value => {
        this.shelf = value.result;
      }
    );
  }

}
