import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/common/services/web-service/webservice.service';
import { AuthData, AuthUserData, LoginRes } from '../interfaces/auth.interface';
import { StaticData } from 'src/assets/static-data/static.data';
import { JSONData } from 'src/app/common/interfaces/api-responses.interface';
import { Router } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { PRIMITIVE_VALUE, NUMERICAL_CONST, LOCAL_STORAGE } from 'src/assets/constants/common-constants';
import { CommonDialogUtil } from 'src/app/common/utilities/common-dialog.util';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/common/components/confirmation/confirmation.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private authStateListener: BehaviorSubject<boolean>;
  private tokenTimer: any;
  private commonDialogs = CommonDialogUtil;
  private userId: string;

  constructor(
    private webService: WebserviceService,
    private router: Router,
    private matDialog: MatDialog
  ) {
    this.authStateListener = new BehaviorSubject(PRIMITIVE_VALUE.false);
  }

  public getAuthStateListener(): Observable<boolean> {
    return this.authStateListener.asObservable();
  }

  public getToken() {
    return this.token;
  }

  public getUserId() {
    return this.userId;
  }

  public createUser(userName: string, password: string) {
    const authData: AuthData = { userName, password };
    this.webService.postRequest(StaticData.signUpUrl, authData).subscribe( (response: JSONData<AuthUserData>) => {
      console.log(response);
      this.commonDialogs.confirmDialog(
        response.message, this.matDialog,
        ConfirmationComponent,
        PRIMITIVE_VALUE.true,
        'ok',
        () => { this.router.navigate(['/auth/login']); }
      );
    },
    err => {
      console.log(err.error.data.message);
      if (err.error.data.message) {
        this.commonDialogs.confirmDialog(err.error.data.message, this.matDialog, ConfirmationComponent);
      }
    });
  }

  public login(userName: string, password: string) {
    const authData: AuthData = { userName, password };
    this.webService.postRequest(StaticData.loginUrl, authData).subscribe((res: LoginRes) => {
      console.log(res);
      const token = res && res.token ? res.token : PRIMITIVE_VALUE.null;
      const authUserId: string = res && res.authorisedUserId ? res.authorisedUserId : PRIMITIVE_VALUE.null;
      const tokenExpiresIn: number = res && res.expiresIn ? res.expiresIn : PRIMITIVE_VALUE.zero;
      this.token = token;
      this.userId = authUserId;
      this.authStateListener.next(token ? PRIMITIVE_VALUE.true : PRIMITIVE_VALUE.false);
      if (token) {
        this.setAuthTimer(tokenExpiresIn);
        this.router.navigate(['/']);
        const now: Date = new Date();
        const expirationDate: Date = new Date(now.getTime() + tokenExpiresIn * NUMERICAL_CONST.thousand);
        this.saveAuthData(token, expirationDate, authUserId);
      }
    });
  }

  private setAuthTimer(duration: number): void {
    console.log('Setting auth-timer with duration : ', duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * NUMERICAL_CONST.thousand
  );
  }

  public logout() {
    this.userId = PRIMITIVE_VALUE.null;
    clearTimeout(this.tokenTimer);
    this.token = PRIMITIVE_VALUE.null;
    this.authStateListener.next(PRIMITIVE_VALUE.false);
    this.router.navigate(['auth/login']);
    this.clearAuthData();
  }

  private saveAuthData(token: string, expirationDate: Date, authorisedUserId: string) {
    localStorage.setItem(LOCAL_STORAGE.keys.token, token);
    localStorage.setItem(LOCAL_STORAGE.keys.expiration, expirationDate.toISOString());
    localStorage.setItem(LOCAL_STORAGE.keys.authorisedUserId, authorisedUserId);
  }

  private clearAuthData() {
    localStorage.removeItem(LOCAL_STORAGE.keys.token);
    localStorage.removeItem(LOCAL_STORAGE.keys.expiration);
    localStorage.removeItem(LOCAL_STORAGE.keys.authorisedUserId);
  }

  private getLocalAuthData(): { token: string, expirationDate: Date, userId: string } {
    const token: string = localStorage.getItem(LOCAL_STORAGE.keys.token);
    const expirationDate: string = localStorage.getItem(LOCAL_STORAGE.keys.expiration);
    const authUserId: string = localStorage.getItem(LOCAL_STORAGE.keys.authorisedUserId);
    if (!(token && expirationDate && authUserId)) {
      return { token: PRIMITIVE_VALUE.emptyStr, expirationDate: PRIMITIVE_VALUE.null, userId: PRIMITIVE_VALUE.null};
    }
    return {
      token, expirationDate: new Date(expirationDate), userId: authUserId
    };
  }

  public autoAuthUser() {
    if (this.getLocalAuthData().token && this.getLocalAuthData().expirationDate && this.getLocalAuthData().userId) {
      const authInfo = this.getLocalAuthData();
      const now: Date = new Date();
      const expiresIn: number = authInfo.expirationDate.getTime() - now.getTime();
      console.log('Auto AUth info : ', authInfo, expiresIn);
      if (expiresIn > PRIMITIVE_VALUE.zero) {
        this.token = authInfo.token;
        this.userId = authInfo.userId;
        this.authStateListener.next(PRIMITIVE_VALUE.true);
        this.setAuthTimer(expiresIn / NUMERICAL_CONST.thousand);
      }
    }
  }

}
