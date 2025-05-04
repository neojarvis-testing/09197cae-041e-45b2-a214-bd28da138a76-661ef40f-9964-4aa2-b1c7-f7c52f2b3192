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
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'error', component: ErrorComponent },

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