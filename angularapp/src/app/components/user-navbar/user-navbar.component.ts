import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {

  constructor(private authservice:AuthService,private router:Router) { }

  ngOnInit(): void {
  }


  showLogoutModal :boolean=false;
  
  logout(){
    this.showLogoutModal = true;
  }

  confirmLogout(){}
  cancelLogout(){}

}
