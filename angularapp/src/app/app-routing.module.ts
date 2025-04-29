import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserViewEventComponent } from './components/user-view-event/user-view-event.component';
import { AdminAddEventComponent } from './components/admin-add-event/admin-add-event.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegistrationComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
