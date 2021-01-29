import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../service/profile.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  constructor(public profileS: ProfileService) { }

  ngOnInit(): void {

  }

}
