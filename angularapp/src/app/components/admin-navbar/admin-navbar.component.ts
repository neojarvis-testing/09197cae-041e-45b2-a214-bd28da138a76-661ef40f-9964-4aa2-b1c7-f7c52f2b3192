import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  constructor(private authservice:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  showLogoutModal :boolean=false;
  logout(){
    this.showLogoutModal = true;
  }
}


