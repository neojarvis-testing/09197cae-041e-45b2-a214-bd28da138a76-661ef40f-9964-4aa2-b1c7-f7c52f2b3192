import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user: User = {
    UserId: 0,
    Username: '',
    Email: '',
    MobileNumber: '',
    Password: '',
    UserRole: ''
  };

  constructor(private authService: AuthService) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log("User passed is: "+this.user.Email);
      console.log("User passed is: "+this.user.Password);
      console.log("User passed is: "+this.user.MobileNumber);
      console.log("User passed is: "+this.user.UserRole);
      console.log("User passed is: "+this.user.Username);
      this.authService.register(this.user).subscribe(
        response => {
          console.log("the user is" + this.user);
          alert('Registration successful!');
          form.reset();
        },
        error => {
          alert('Registration failed. User already exists.');
        }
      );
    }
  }
}
