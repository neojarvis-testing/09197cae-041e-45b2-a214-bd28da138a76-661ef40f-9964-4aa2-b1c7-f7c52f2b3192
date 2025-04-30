import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService.login(this.login).subscribe(
        response => {
          alert('Login successful!');
          form.reset();
        },
        error => {
          alert('Invalid email or password.');
        }
      );
    }
  }
}
