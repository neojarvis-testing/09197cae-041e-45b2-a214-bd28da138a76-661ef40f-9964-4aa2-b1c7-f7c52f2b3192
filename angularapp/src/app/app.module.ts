import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminAddEventComponent } from './components/admin-navbar/admin-add-event/admin-add-event.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { AdminViewEventComponent } from './components/admin-view-event/admin-view-event.component';
import { AdminViewFeedbackComponent } from './components/admin-view-feedback/admin-view-feedback.component';
import { AdminViewRequirementComponent } from './components/admin-view-requirement/admin-view-requirement.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserAddFeedbackComponent } from './components/user-add-feedback/user-add-feedback.component';
import { UserAddRequirementComponent } from './components/user-add-requirement/user-add-requirement.component';
import { UserNavbarComponent } from './components/user-navbar/user-navbar.component';
import { UserViewEventComponent } from './components/user-view-event/user-view-event.component';
import { UserViewFeedbackComponent } from './components/user-view-feedback/user-view-feedback.component';
import { UserViewRequirementComponent } from './components/user-view-requirement/user-view-requirement.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AdminAddEventComponent,
    AdminNavbarComponent,
    AdminViewEventComponent,
    AdminViewFeedbackComponent,
    AdminViewRequirementComponent,
    ErrorComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    RegistrationComponent,
    UserAddFeedbackComponent,
    UserAddRequirementComponent,
    UserNavbarComponent,
    UserViewEventComponent,
    UserViewFeedbackComponent,
    UserViewRequirementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
