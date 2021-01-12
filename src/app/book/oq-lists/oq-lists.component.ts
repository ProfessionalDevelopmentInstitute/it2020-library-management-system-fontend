import { Component, OnInit } from '@angular/core';
import {OldQService} from '../../service/old-q.service';
import {OqModel} from '../../model/oq.model';
import {ActivatedRoute, Route, Router} from '@angular/router';

@Component({
  selector: 'app-oq-lists',
  templateUrl: './oq-lists.component.html',
  styleUrls: ['./oq-lists.component.css']
})
export class OqListsComponent implements OnInit {

  lists: OqModel[];
  p: Number = 1;
  idToOqD: number;
  idToOq: number;
  year: string;
  pdfUrl: string;
  constructor(private oqService: OldQService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.oqService.getOQs().subscribe(
      value => {
        this.lists = value.result;
        console.log(value.result)
      },

    );
  }

  onClick(id: number): void{
    this.idToOq = id;
    console.log(id);
    this.oqService.getOQById(id).subscribe(
      value => {
        this.pdfUrl = value.result.pdfUrl;
        this.year = value.result.year;
        console.log(value.result.year)
      }
    );
    // this.router.navigate(['dashboard/pdf/view'])
  }

}
// this.route.params.subscribe(
//   param => {
//     const idparam = 'id';
//     this.id = param[idparam] ;
//     let list: OqModel[] = null;
//     console.log(this.id);
//     this.oqService.getOQById(this.id).subscribe(
//       value => {
//         console.log(value);
//         list = value.result;
//         // this.myForm.reset(donor);
//       }
//     );
//   }
// );
