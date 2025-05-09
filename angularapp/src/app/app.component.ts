import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularapp';

  constructor(private service: AuthService) {
    this.service.isAdmin() ? this.role = "Admin" : this.role = "User";
  }

  role: string = '';

}
