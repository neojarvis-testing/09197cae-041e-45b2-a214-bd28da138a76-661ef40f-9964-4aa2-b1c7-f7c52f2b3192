import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  submitted = false;
  user: User = {
    UserId: 0,
    Email: '',
    Password: '',
    Username: '',
    MobileNumber: '',
    UserRole: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  calling(): void {
    this.submitted = true;

    if (!this.user.Email || !this.user.Password || !this.user.Username || !this.user.MobileNumber || !this.user.UserRole) {
      alert('All fields are required.');
      return;
    }

    this.authService.register(this.user, this.user.UserRole).subscribe(
      data => {
        alert('Registration successful');
        this.router.navigate(['/login']);
      },
      error => {
        console.log('Registration error', error);
      }
    );
  }
}
