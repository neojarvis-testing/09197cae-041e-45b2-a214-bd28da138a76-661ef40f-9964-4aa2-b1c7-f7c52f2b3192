// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { User } from 'src/app/models/user.model';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-admin-navbar',
//   templateUrl: './admin-navbar.component.html',
//   styleUrls: ['./admin-navbar.component.css']
// })
// export class AdminNavbarComponent implements OnInit {
//   public User_name: string = '';
//   isLoggedIn: boolean = false;
//   showLogoutModal :boolean=false;
//   role: string = '';
//   public aService: AuthService;


//   constructor(private router:Router, private authService: AuthService) {
//     this.isLoggedIn = this.authService.isLoggedIn(); 
//     this.aService = authService;
//   }
  
//   //  console.log('isLoggedIn:', this.isLoggedIn);
//   //  console.log('role:', this.role);


//    ngOnInit(): void {
//     this.authService.currentUser.subscribe(user => {
//       if (user) {
//         this.User_name = user.Username;
//         this.role = user.UserRole; // Update role dynamically
//       }
//       console.log('isLoggedIn:', this.isLoggedIn);
//       console.log('role:', this.role);
//     });
//   }
  
//   logout(){
//     this.showLogoutModal = true;
//   }

//   confirmLogout(){
//     this.authService.logout();
//     this.router.navigate([`/login`]);
//     this.showLogoutModal = false;
//   }
//   cancelLogout(){
//     this.showLogoutModal = false;
//   }
// }


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
  public User_name: string = '';
  isLoggedIn: boolean = false;
  showLogoutModal: boolean = false;
  role: string = '';
  public aService: AuthService;

  constructor(private router: Router, private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn(); 
    this.aService = authService;
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.User_name = user.Username;
        this.role = user.UserRole; // Update role dynamically
      }
    });
  }

  logout() {
    this.showLogoutModal = true;
  }

  confirmLogout() {
    Swal.fire({
      title: 'Logging out...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        const loader = document.querySelector('.swal2-loader') as HTMLElement;
        if (loader) {
          loader.style.transform = 'scale(0.7)'; // Make the spinner smaller
        }
      }
    });

    setTimeout(() => {
      this.authService.logout();
      this.router.navigate(['/login']);
      this.showLogoutModal = false;
      Swal.close(); // Close the loader after logout process finishes
    }, 1500); // Adjust delay based on actual API response time
  }

  cancelLogout() {
    this.showLogoutModal = false;
  }

  navigateWithLoader(route: string) {
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        const loader = document.querySelector('.swal2-loader') as HTMLElement;
        if (loader) {
          loader.style.transform = 'scale(0.7)'; // Make the spinner smaller
        }
      }
    });

    setTimeout(() => {
      this.router.navigate([route]);
      Swal.close(); // Close loader after navigating
    }, 1500); // Adjust delay based on actual loading time
  }
}
