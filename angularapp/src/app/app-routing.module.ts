import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { UserNavbarComponent } from './components/user-navbar/user-navbar.component';
import { ErrorComponent } from './components/error/error.component';
import { AdminViewRequirementComponent } from './components/admin-view-requirement/admin-view-requirement.component';
import { UserViewRequirementComponent } from './components/user-view-requirement/user-view-requirement.component';
import { UserAddRequirementComponent } from './components/user-add-requirement/user-add-requirement.component';
import { Feedback } from './models/feedback.model';
import { UserViewFeedbackComponent } from './components/user-view-feedback/user-view-feedback.component';
import { AdminViewEventComponent } from './components/admin-view-event/admin-view-event.component';
import { UserAddFeedbackComponent } from './components/user-add-feedback/user-add-feedback.component';
import { AdminViewFeedbackComponent } from './components/admin-view-feedback/admin-view-feedback.component';
import { AdminAddEventComponent } from './components/admin-add-event/admin-add-event.component';
import { UserViewEventComponent } from './components/user-view-event/user-view-event.component';
const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent },
  { path: "error", component: ErrorComponent },
  { path: "register", component: RegistrationComponent },
  { path: "view-feedback", component: UserViewFeedbackComponent },
  { path: "add-feedback", component: UserAddFeedbackComponent },
  { path: "events", component: AdminViewEventComponent },
  { path: "error", component: ErrorComponent },
  { path: "user-view-requirement", component: UserViewRequirementComponent },
  {path: "admin-view-feedbacks",component:AdminViewFeedbackComponent},
  {path: "admin-add-event",component:AdminAddEventComponent},
  {path: "admin-add-event/:id",component:AdminAddEventComponent},
  {path: "admin-view-event",component:AdminViewEventComponent},
  {path: "user-view-event",component:UserViewEventComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

