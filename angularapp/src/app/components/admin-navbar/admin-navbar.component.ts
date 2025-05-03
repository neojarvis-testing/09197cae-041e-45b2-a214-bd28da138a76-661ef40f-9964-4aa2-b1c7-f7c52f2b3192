import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
  public User_name: string = '';

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  showLogoutModal :boolean=false;
  logout(): void {
    this.showLogoutModal = true;
  }

  confirmLogout(): void {
    this.showLogoutModal = false;
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  cancelLogout(): void {
    this.showLogoutModal = false;
  }
}


