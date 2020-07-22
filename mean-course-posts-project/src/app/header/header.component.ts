import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Subscription } from 'rxjs';
import { PRIMITIVE_VALUE } from 'src/assets/constants/common-constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private $authStateListenerSub: Subscription;
  public isUserAuthenticated: boolean;

  constructor(private authService: AuthService) {
    this.isUserAuthenticated = PRIMITIVE_VALUE.false;
  }

  ngOnInit(): void {
    this.$authStateListenerSub = this.authService.getAuthStateListener().subscribe( (authState: boolean) => {
      this.isUserAuthenticated = authState ? authState : PRIMITIVE_VALUE.false;
    });
  }

  ngOnDestroy(): void {
    this.$authStateListenerSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

}
