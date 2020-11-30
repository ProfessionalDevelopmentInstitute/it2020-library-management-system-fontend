import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './dashboard/navbar/navbar.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { MainComponent } from './dashboard/main/main.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { AboutComponent } from './about/about.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CategoryComponent } from './book/category/category.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ListsComponent } from './book/lists/lists.component';
import { ShelfOneComponent } from './book/shelf-one/shelf-one.component';
import { DataTablesModule} from 'angular-datatables';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ShelvesComponent } from './book/shelves/shelves.component';
import { AddItemComponent } from './book/add-item/add-item.component';
import { StudentListComponent } from './user/student-list/student-list.component';
import { AddStudentComponent } from './user/add-student/add-student.component';
import { LibrarianRegisterComponent } from './user/register/librarian-register/librarian-register.component';
import {Route, RouterModule, Routes} from '@angular/router';
import {BasicAuthService} from './service/basic-auth.service';
import { RentComponent } from './book/rent/rent.component';

const routes: Routes = [
  { path: '',   redirectTo: 'login', pathMatch: 'full' },
  {path: 'dashboard', component: NavbarComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'librarian/register', component: LibrarianRegisterComponent},
  {path: 'about', component: AboutComponent},
  {path: 'login', component: LoginComponent},
  {path: 'book/category', component: CategoryComponent},
  {path: 'book/list', component: ListsComponent},
  {path: 'shelf/one', component: ShelfOneComponent},
  {path: 'shelves', component: ShelvesComponent},
  {path: 'add/new/items', component: AddItemComponent},
  {path: 'student/list', component: StudentListComponent},
  {path: 'add/library/card', component: AddStudentComponent},
  {path: 'rent/list', component: RentComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    MainComponent,
    RegisterComponent,
    LoginComponent,
    AboutComponent,
    CategoryComponent,
    ListsComponent,
    ShelfOneComponent,
    ShelvesComponent,
    AddItemComponent,
    StudentListComponent,
    AddStudentComponent,
    LibrarianRegisterComponent,
    RentComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(routes)
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: BasicAuthService,
    multi: true
  }],
  bootstrap: [AppComponent]
})

export class AppModule { }
