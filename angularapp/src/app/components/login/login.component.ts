// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
 
import { Router } from '@angular/router';
 
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
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
 
  get f() {
    return this.loginForm.controls;
  }
 
  onSubmit(): void {
   
    this.submitted = true;
 
    if (this.loginForm.invalid) {
      return;
    }
 
    this.authService.login(this.loginForm.value).subscribe(
      data => {
        console.log('Login successful', data);
        this.router.navigate(['/dashboard']);
      },
      error=> {
        console.error('Login error', error);
      }
    );
  }
}
 
 