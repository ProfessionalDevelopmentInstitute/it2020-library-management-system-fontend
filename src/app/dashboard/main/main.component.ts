import { Component, OnInit } from '@angular/core';
import {ShelfService} from '../../service/shelf.service';
import {Shelf} from '../../model/shelf.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {

  }

}
