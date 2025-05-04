import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
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
    };
  
    Swal.fire({
      title: 'Logging in...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        const loader = document.querySelector('.swal2-loader') as HTMLElement;
        if (loader) {
          loader.style.transform = 'scale(0.7)'; // Adjust the size of the loading spinner
        }
      }
    });
  
    this.authService.login(newLogin).subscribe(
      data => {
        console.log('Login successful', data);
        Swal.close(); // Close the loading screen after login succeeds
        this.router.navigate(['/home']);
      },
      error => {
        Swal.close(); // Close the loading screen if login fails
        console.error('Login error', error);
      }
    );
  }
  
}
