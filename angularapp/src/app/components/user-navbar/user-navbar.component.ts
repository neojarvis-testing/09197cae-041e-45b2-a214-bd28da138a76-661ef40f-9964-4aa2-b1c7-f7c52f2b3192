import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }


  showLogoutModal :boolean=false;
  
  logout(){
    this.showLogoutModal = true;
  }

  confirmLogout(){
    this.router.navigate([`/login`]);
  }
  cancelLogout(){
    this.showLogoutModal = false;
  }

}
