import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
 
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
 
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
 
  ngOnInit(): void {

  }

  login:Login = {
    email: '',
    password: ''
  }


  onSubmit(form: NgForm): void {

    this.submitted = true;

    console.log(form.value);

    const newLogin: Login = {
      email: form.value.email,
      password: form.value.password

    }

    this.authService.login(newLogin).subscribe(
      data => {
        console.log('Login successful', data);
        this.router.navigate([data.UserRole==='Admin'?'/admin':'/user']);
      },
      error=> {
        console.error('Login error', error);
      }
    );
  }
}
 
 