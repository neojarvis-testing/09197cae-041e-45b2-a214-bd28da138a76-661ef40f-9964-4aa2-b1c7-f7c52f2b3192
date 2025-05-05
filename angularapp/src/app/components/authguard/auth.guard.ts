import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
   
    const isLoggedIn = this.authService.isLoggedIn();
    const userRole = this.authService.getUserRole(); // 'Admin' or 'User'
    const url = state.url;

    if (!isLoggedIn) {
      this.snackBar.open('Please login to continue.', 'Close', {
        duration: 3000,
        verticalPosition: 'top'
      });
      this.router.navigate(['/login']);
      return false;
    }

    // Check role-based access
    if (url.startsWith('/admin') && userRole !== 'Admin') {
      this.snackBar.open('You are not authorized to access Admin pages.', 'Close', {
        duration: 3000,
        verticalPosition: 'top'
      });
      this.router.navigate(['/home']);
      return false;
    }

    if (url.startsWith('/user') && userRole !== 'User') {
      this.snackBar.open('You are not authorized to access User pages.', 'Close', {
        duration: 3000,
        verticalPosition: 'top'
      });
      this.router.navigate(['/home']);
      return false;
    }

    return true; // authorized
  }
}