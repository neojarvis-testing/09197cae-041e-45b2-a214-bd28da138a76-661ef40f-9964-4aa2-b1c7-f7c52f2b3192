import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

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
  confirmPassword:string="";

  constructor(private authService: AuthService,private router:Router) { }

  onSubmit(form: NgForm) {
    if (form.valid && this.user.Password === this.confirmPassword) {
      Swal.fire({
        title: 'Loading...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
          const loader = document.querySelector('.swal2-loader') as HTMLElement;
          if (loader) {
            loader.style.transform = 'scale(0.7)'; // Adjust the size by scaling down
          }
        }
      });
  
      this.authService.register(this.user).subscribe(
        response => {
          console.log("The user is:", this.user);
  
          Swal.close(); // Close the loading screen only after the registration is successful
          this.router.navigate(['/login']);
          form.reset();
        },
        error => {
          Swal.close(); // Close the loading screen if registration fails
          alert('Registration failed. User already exists.');
        }
      );
    }
  }
}
