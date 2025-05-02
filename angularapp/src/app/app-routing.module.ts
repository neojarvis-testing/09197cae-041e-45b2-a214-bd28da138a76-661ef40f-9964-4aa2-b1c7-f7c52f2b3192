import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserViewEventComponent } from './components/user-view-event/user-view-event.component';
import { AdminAddEventComponent } from './components/admin-add-event/admin-add-event.component';
import { AdminViewEventComponent } from './components/admin-view-event/admin-view-event.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { UserNavbarComponent } from './components/user-navbar/user-navbar.component';
import { ErrorComponent } from './components/error/error.component';
import { AdminViewRequirementComponent } from './components/admin-view-requirement/admin-view-requirement.component';
import { UserViewRequirementComponent } from './components/user-view-requirement/user-view-requirement.component';
import { UserAddRequirementComponent } from './components/user-add-requirement/user-add-requirement.component';
const routes: Routes = [
  {path:"",component:AdminAddEventComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
