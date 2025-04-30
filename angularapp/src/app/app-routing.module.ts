import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component'; 
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { UserNavbarComponent } from './components/user-navbar/user-navbar.component';
import { ErrorComponent } from './components/error/error.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { Feedback } from './models/feedback.model';
import { UserViewFeedbackComponent } from './components/user-view-feedback/user-view-feedback.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
 
