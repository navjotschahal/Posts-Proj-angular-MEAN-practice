import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { PRIMITIVE_VALUE } from 'src/assets/constants/common-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private $router: Router
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isAuthenticated: boolean = PRIMITIVE_VALUE.false;
    this.authService.getAuthStateListener().subscribe((authState): void => {
      isAuthenticated = authState;
    });
    if (!isAuthenticated) {
      this.$router.navigate(['auth/login']);
    }
    return isAuthenticated;
  }
}
