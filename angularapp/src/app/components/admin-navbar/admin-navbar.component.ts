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

  constructor(private router:Router,private service:AuthService) { }

  ngOnInit(): void {
  }

  showLogoutModal :boolean=false;
  logout(){
    this.showLogoutModal = true;
  }
  
  confirmLogout(){
    this.service.logout();
    this.showLogoutModal = false;
    this.router.navigate([`/login`]);
  }
  cancelLogout(){}
}


