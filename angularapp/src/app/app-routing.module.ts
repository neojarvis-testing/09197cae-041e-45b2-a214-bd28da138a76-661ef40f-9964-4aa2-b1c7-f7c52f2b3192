import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserViewEventComponent } from './components/user-view-event/user-view-event.component';
import { AdminAddEventComponent } from './components/admin-add-event/admin-add-event.component';
const routes: Routes = [
  {path:"",component:AdminAddEventComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
