import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * Constructor
   */
  constructor() {
  }

  /**
   * Intercept
   *
   * @param req
   * @param next
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newReq = req.clone();

    // if (this._authService.accessToken) {
    //   newReq = req.clone({
    //     headers: req.headers.set('Authorization', 'Bearer ' + this._authService.accessToken)
    //   });
    // }

    return next.handle(newReq).pipe(
      catchError((error) => {
        // if (error instanceof HttpErrorResponse && error.status === 401) {
        //   // Sign out
        //   this._authService.signOut(false);
        //   this._router.navigateByUrl('sign-in');
        //   if (error.url.includes('/authenticate')) {
        //     this.matSnackBar.open(error?.error?.message || 'Có lỗi xảy ra', null, {
        //       panelClass: 'bg-red-500'
        //     });
        //   }
        //   // Reload the app
        //   // location.reload();
        // } else if (error instanceof HttpErrorResponse && error.status === 403 && error.url.endsWith('/authenticate')) {
        //   this._router.navigateByUrl('unlock-session')
        // } else if (error instanceof HttpErrorResponse && (error.status === 500 || error?.status <= 0) && !error.url.includes('dashboard')) {
        //   this._router.navigateByUrl('500')
        // } else if (error instanceof HttpErrorResponse && error.status === 404 && !error.url.includes('dashboard')) {
        //   this._router.navigateByUrl('404')
        // } else {
        //   this.matSnackBar.open(error?.error?.message || 'Có lỗi xảy ra', null, {
        //     panelClass: 'bg-red-500'
        //   });
        // }
        return throwError(error);
      })
    );
  }
}
