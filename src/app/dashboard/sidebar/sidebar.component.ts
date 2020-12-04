import { Component, OnInit } from '@angular/core';
import {AuthModel} from '../../model/auth.model';
import {LoginManagerService} from '../../service/login-manager.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  authModel: AuthModel;

  constructor(private loginManager: LoginManagerService) {
    loginManager.isAuth.subscribe(value => {
      this.authModel = value;
    });
  }

  ngOnInit(): void {

  }

}
