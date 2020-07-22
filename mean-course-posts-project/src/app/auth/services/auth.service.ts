import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/common/services/web-service/webservice.service';
import { AuthData, AuthUserData } from '../interfaces/auth.interface';
import { StaticData } from 'src/assets/static-data/static.data';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/common/components/confirmation/confirmation.component';
import { JSONData } from 'src/app/common/interfaces/api-responses.interface';
import { Router } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { PRIMITIVE_VALUE, NUMERICAL_CONST, LOCAL_STORAGE } from 'src/assets/constants/common-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private authStateListener: BehaviorSubject<boolean>;
  private tokenTimer: any;

  constructor(
    private webService: WebserviceService,
    private matDialog: MatDialog,
    private router: Router
  ) {
    this.authStateListener = new BehaviorSubject(PRIMITIVE_VALUE.false);
  }

  public getAuthStateListener(): Observable<boolean> {
    return this.authStateListener.asObservable();
  }

  public getToken() {
    return this.token;
  }

  public createUser(userName: string, password: string) {
    const authData: AuthData = { userName, password };
    this.webService.postRequest(StaticData.signUpUrl, authData).subscribe( (response: JSONData<AuthUserData>) => {
      console.log(response);
      this.confirmDialog(response.message, false, 'ok', () => { this.router.navigate(['/auth/login']); });
    },
    err => {
      console.log(err.error.data.message);
      if (err.error.data.message) {
        this.confirmDialog(err.error.data.message);
      }
    });
  }

  public login(userName: string, password: string) {
    const authData: AuthData = { userName, password };
    this.webService.postRequest(StaticData.loginUrl, authData).subscribe((res: {token: string, expiresIn: number}) => {
      console.log(res);
      const token = res && res.token ? res.token : PRIMITIVE_VALUE.null;
      const tokenExpiresIn: number = res && res.expiresIn ? res.expiresIn : PRIMITIVE_VALUE.zero;
      this.token = token;
      this.authStateListener.next(token ? PRIMITIVE_VALUE.true : PRIMITIVE_VALUE.false);
      if (token) {
        this.setAuthTimer(tokenExpiresIn);
        this.router.navigate(['/']);
        const now: Date = new Date();
        const expirationDate: Date = new Date(now.getTime() + tokenExpiresIn * NUMERICAL_CONST.thousand);
        this.saveAuthData(token, expirationDate);
      }
    },
    (err) => {
      this.confirmDialog('Login failed!');
      console.log(err);
    });
  }

  private setAuthTimer(duration: number): void {
    console.log('Setting auth-timer with duration : ', duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * NUMERICAL_CONST.thousand
  );
  }

  private confirmDialog(msg: string, disableClose: boolean = false, buttonName: string = 'ok', perform: () => void = () => {}) {
    const initialState = {
      disableClose ,
      data: {
        message: msg,
        buttonName
      }
    };
    const performFn: () => void = perform;
    const confirmDialogRef = this.matDialog.open(ConfirmationComponent, initialState);
    confirmDialogRef.afterClosed().subscribe((confirm: boolean) => {
        console.log(confirm);
        if (confirm) {
          performFn();
        }
      });
  }

  public logout() {
    clearTimeout(this.tokenTimer);
    this.token = PRIMITIVE_VALUE.null;
    this.authStateListener.next(PRIMITIVE_VALUE.false);
    this.router.navigate(['auth/login']);
    this.clearAuthData();
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem(LOCAL_STORAGE.keys.token, token);
    localStorage.setItem(LOCAL_STORAGE.keys.expiration, expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem(LOCAL_STORAGE.keys.token);
    localStorage.removeItem(LOCAL_STORAGE.keys.expiration);
  }

  private getLocalAuthData(): { token: string, expirationDate: Date } {
    const token: string = localStorage.getItem(LOCAL_STORAGE.keys.token);
    const expirationDate: string = localStorage.getItem(LOCAL_STORAGE.keys.expiration);
    if (!(token && expirationDate)) {
      return { token: '', expirationDate: null};
    }
    return {
      token, expirationDate: new Date(expirationDate)
    };
  }

  public autoAuthUser() {
    if (this.getLocalAuthData().token && this.getLocalAuthData().expirationDate) {
      const authInfo = this.getLocalAuthData();
      const now: Date = new Date();
      const expiresIn: number = authInfo.expirationDate.getTime() - now.getTime();
      console.log('Auto AUth info : ', authInfo, expiresIn);
      if (expiresIn > PRIMITIVE_VALUE.zero) {
        this.token = authInfo.token;
        this.authStateListener.next(PRIMITIVE_VALUE.true);
        this.setAuthTimer(expiresIn / NUMERICAL_CONST.thousand);
      }
    }
  }

}
