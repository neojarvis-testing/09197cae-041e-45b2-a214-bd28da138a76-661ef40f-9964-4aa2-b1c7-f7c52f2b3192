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
  confirmPassword: string="";
  AdminSecretKey: string = "";
  successMessage: string = "";


  constructor(private authService: AuthService,private router:Router) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      Swal.fire({
        title: 'Loading...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
          const loader = document.querySelector('.swal2-loader') as HTMLElement;
          if (loader) {
            loader.style.transform = 'scale(0.7)';
          }
        }
      });
  
      this.authService.register(this.user).subscribe(
        response => {
          Swal.close();
          this.successMessage = 'Successfully Registered!';
          form.reset();
        },
        error => {
          Swal.close();
          alert('Registration failed. User already exists.');
        }
      );
    }
  }
  

  closePopup(): void {
    this.successMessage = '';
    this.router.navigate(['/login']);
  }

}
