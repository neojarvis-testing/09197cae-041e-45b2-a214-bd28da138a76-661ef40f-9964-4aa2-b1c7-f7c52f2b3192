import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserViewEventComponent } from './components/user-view-event/user-view-event.component';
import { AdminAddEventComponent } from './components/admin-add-event/admin-add-event.component';
import { AdminViewEventComponent } from './components/admin-view-event/admin-view-event.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { UserNavbarComponent } from './components/user-navbar/user-navbar.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
