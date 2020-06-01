import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorComponent } from '../app/Components/error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req)
      .pipe(catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown message occured';
        if (error.error.message) {
          errorMessage = error.error.message;
        }
        this.dialog.open(ErrorComponent, { data: { message: errorMessage } });
        return throwError(error);
      }));
  }

}