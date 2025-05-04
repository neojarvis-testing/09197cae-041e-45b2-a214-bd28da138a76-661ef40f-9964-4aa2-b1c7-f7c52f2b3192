import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { AdminViewRequirementComponent } from './components/admin-view-requirement/admin-view-requirement.component';
import { UserViewRequirementComponent } from './components/user-view-requirement/user-view-requirement.component';
import { UserAddRequirementComponent } from './components/user-add-requirement/user-add-requirement.component';
import { UserViewFeedbackComponent } from './components/user-view-feedback/user-view-feedback.component';
import { AdminViewEventComponent } from './components/admin-view-event/admin-view-event.component';
import { UserAddFeedbackComponent } from './components/user-add-feedback/user-add-feedback.component';
import { AdminViewFeedbackComponent } from './components/admin-view-feedback/admin-view-feedback.component';
import { AdminAddEventComponent } from './components/admin-add-event/admin-add-event.component';
import { UserViewEventComponent } from './components/user-view-event/user-view-event.component';
import { LoggedUserDetailsComponent } from './components/logged-user-details/logged-user-details.component';
import { AuthGuard } from './components/authguard/auth.guard';

const routes: Routes = [
<<<<<<< HEAD
  { path: "login", component: LoginComponent },
  { path: "", component: HomeComponent },
  { path: "admin/home", component: HomeComponent},
  { path: "user/home", component: HomeComponent},
  { path: "error", component: ErrorComponent },
  { path: "register", component: RegistrationComponent },
  { path: "user/app-user-view-feedback", component: UserViewFeedbackComponent },
  { path: "user/app-user-add-feedback", component: UserAddFeedbackComponent },
  { path: "admin/app-admin-view-event", component: AdminViewEventComponent },
  { path: "error", component: ErrorComponent },
  { path: "user/app-user-view-requirement", component: UserViewRequirementComponent },
  { path: "user/app-user-add-requirement", component: UserAddRequirementComponent},
  { path: "user/app-user-add-requirement/:id", component: UserAddRequirementComponent},
  { path: "admin/app-admin-view-requirement", component: AdminViewRequirementComponent},
  { path: "admin/app-admin-view-feedback",component:AdminViewFeedbackComponent},
  { path: "home", component: HomeComponent},
  { path: "admin/app-admin-add-event",component:AdminAddEventComponent},
  { path: "admin/app-admin-add-event/:id",component:AdminAddEventComponent},
  { path: "user/app-user-view-event",component:UserViewEventComponent},
  { path: "view-feedback", component: UserViewFeedbackComponent },
  { path: "add-feedback", component: UserAddFeedbackComponent },
  { path: "admin-view-event", component: AdminViewEventComponent },
  { path: "admin/admin-view-event", component: AdminViewEventComponent },
  { path: "admin/add-event", component: AdminAddEventComponent },
  { path: "error", component: ErrorComponent },
  { path: "user-view-requirement", component: UserViewRequirementComponent },
  { path: "admin/admin-view-feedbacks", component: AdminViewFeedbackComponent },
  { path: "user-add-requirement", component: UserAddRequirementComponent },
  { path: "user-add-requirement/:id", component: UserAddRequirementComponent },
  { path: "admin/admin-view-requirement", component: AdminViewRequirementComponent },
  { path: "admin/admin-view-feedbacks", component: AdminViewFeedbackComponent },
  { path: "add-event", component: AdminAddEventComponent },
  { path: "view-event", component: AdminViewEventComponent },
  { path: "admin/view-event", component: AdminViewEventComponent },
  { path: "admin/home", component: HomeComponent },
  { path: "user/home", component: HomeComponent },
  {path:"home",component:HomeComponent},
  { path: "admin-view-feedbacks", component: AdminViewFeedbackComponent },
  { path: "admin/admin-add-event", component: AdminAddEventComponent },
  { path: "admin/admin-add-event/:id", component: AdminAddEventComponent },
  { path: "admin/admin-view-event", component: AdminViewEventComponent },
  { path: "user-view-event", component: UserViewEventComponent },
  { path: "user-view-feedback", component: UserViewFeedbackComponent },
  { path: "admin/app-admin-view-feedback", component: AdminViewFeedbackComponent },
];
=======
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'error', component: ErrorComponent },
>>>>>>> 70d11dc69fdb41536a0291af6664f4f7f7b41fae

  // Admin Routes (Protected)
  { path: 'admin/home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'admin/app-admin-view-event', component: AdminViewEventComponent, canActivate: [AuthGuard] },
  { path: 'admin/app-admin-view-requirement', component: AdminViewRequirementComponent, canActivate: [AuthGuard] },
  { path: 'admin/app-admin-view-feedback', component: AdminViewFeedbackComponent, canActivate: [AuthGuard] },
  { path: 'admin/app-admin-add-event', component: AdminAddEventComponent, canActivate: [AuthGuard] },
  { path: 'admin/app-admin-add-event/:id', component: AdminAddEventComponent, canActivate: [AuthGuard] },
  { path: 'admin/admin-add-event/:id', component: AdminAddEventComponent, canActivate: [AuthGuard] },
  { path: 'admin-profile', component: LoggedUserDetailsComponent, canActivate: [AuthGuard] },

  // User Routes (Protected)
  { path: 'user/home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'user/app-user-view-event', component: UserViewEventComponent, canActivate: [AuthGuard] },
  { path: 'user/app-user-view-feedback', component: UserViewFeedbackComponent, canActivate: [AuthGuard] },
  { path: 'user/app-user-add-feedback', component: UserAddFeedbackComponent, canActivate: [AuthGuard] },
  { path: 'user/app-user-view-requirement', component: UserViewRequirementComponent, canActivate: [AuthGuard] },
  { path: 'user/app-user-add-requirement', component: UserAddRequirementComponent, canActivate: [AuthGuard] },
  { path: 'user/app-user-add-requirement/:id', component: UserAddRequirementComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}