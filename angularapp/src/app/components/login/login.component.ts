// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }


  onSubmit(form: NgForm): void {

    this.submitted = true;

    console.log(form.value);

    const newLogin: Login = {
      Email: form.value.email,
      Password: form.value.password

    }

    this.authService.login(newLogin).subscribe(
      data => {
        console.log('Login successful', data);
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Login error', error);
      }
    );
  }
}
