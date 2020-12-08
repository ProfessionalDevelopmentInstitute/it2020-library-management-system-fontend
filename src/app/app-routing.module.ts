import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './user/register/register.component';
import {NavbarComponent} from './dashboard/navbar/navbar.component';
import {AboutComponent} from './about/about.component';
import {LoginComponent} from './user/login/login.component';
import {CategoryComponent} from './book/category/category.component';
import {ListsComponent} from './book/lists/lists.component';
import {ShelfOneComponent} from './book/shelf-one/shelf-one.component';
import {ShelvesComponent} from './book/shelves/shelves.component';
import {AddItemComponent} from './book/add-item/add-item.component';
import {StudentListComponent} from './user/student-list/student-list.component';
import {LibrarianRegisterComponent} from './user/register/librarian-register/librarian-register.component';

const routes: Routes = [
  // { path: '',   redirectTo: 'dashboard', pathMatch: 'full' },
  // {path: 'dashboard', component: NavbarComponent},
  // {path: 'register', component: RegisterComponent},
  // {path: 'librarian/register', component: LibrarianRegisterComponent},
  // {path: 'about', component: AboutComponent},
  // {path: 'login', component: LoginComponent},
  // {path: 'book/category', component: CategoryComponent},
  // {path: 'book/list', component: ListsComponent},
  // {path: 'shelf/one', component: ShelfOneComponent},
  // {path: 'shelves', component: ShelvesComponent},
  // {path: 'add/new/items', component: AddItemComponent},
  // {path: 'student/list', component: StudentListComponent},
  // {path: 'add/new/student', component: AddStudentComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { RegisterComponent; NavbarComponent;
AboutComponent; LoginComponent; CategoryComponent; ListsComponent; AddItemComponent;
  StudentListComponent; AddStudentComponent; LibrarianRegisterComponent; }
