import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonDialogUtil } from './common/utilities/common-dialog.util';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from './common/components/confirmation/confirmation.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PRIMITIVE_VALUE, NUMERICAL_CONST } from 'src/assets/constants/common-constants';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private matDialog: MatDialog,
    private snackBar: MatSnackBar
    ) {}

  openSnackBar(msg: string) {
    this.snackBar.open(msg, 'End now', {
      duration: NUMERICAL_CONST.thousand * 7,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        this.openSnackBar(err.error.message);
        // CommonDialogUtil.confirmDialog(err.error.data.message, this.matDialog, ConfirmationComponent);
        return throwError(err);
      })
    );
  }
}
