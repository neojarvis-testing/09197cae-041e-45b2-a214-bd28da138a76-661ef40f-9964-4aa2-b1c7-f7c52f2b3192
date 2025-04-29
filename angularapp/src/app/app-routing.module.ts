import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserViewEventComponent } from './components/user-view-event/user-view-event.component';
import { AdminAddEventComponent } from './components/admin-add-event/admin-add-event.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { UserNavbarComponent } from './components/user-navbar/user-navbar.component';
import { ErrorComponent } from './components/error/error.component';
const routes: Routes = [
  {path:"",component:AdminAddEventComponent},
  {path:"",component:NavbarComponent},
  {path:"",component:AdminNavbarComponent},
  {path:"",component:UserNavbarComponent},
  {path:"",component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
