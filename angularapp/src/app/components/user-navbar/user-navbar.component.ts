import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {
  public User_name: string = '';
  public aService: AuthService;
  isLoggedIn: boolean = false;
  showLogoutModal :boolean=false;
  role: string = '';

  constructor(private router:Router, private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn(); 
    this.aService = authService;
   }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.User_name = user.Username;
        this.role = user.UserRole; // Update role dynamically
      }
      console.log('isLoggedIn:', this.isLoggedIn);
      console.log('role:', this.role);
    });
  }
  
  logout(){
    this.showLogoutModal = true;
  }

  confirmLogout(){
    this.authService.logout();
    this.router.navigate([`/login`]);
    this.showLogoutModal = false;
  }
  cancelLogout(){
    this.showLogoutModal = false;
  }

}
