import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthFacade } from 'src/app/pages/login/auth.facade';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(private authFacade: AuthFacade) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!request.url.includes('/s3')) request = this.addToken(request);

    return next.handle(request).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          [401].includes(error.status)
        ) {
          return this.handle401Error(request, next);
        }

        return throwError(error);
      })
    );
  }

  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      if (this.authFacade.hasRefreshTokenStored) {
        return from(this.authFacade.tryLoginWithRefreshTokenAsync()).pipe(
          switchMap(() => {
            this.isRefreshing = false;
            this.refreshTokenSubject.next(this.authFacade.idToken);
            request = this.addToken(request);
            return next.handle(request);
          })
        );
      }

      return next.handle(request);
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token),
        take(1),
        switchMap(() => {
          request = this.addToken(request);
          return next.handle(request);
        })
      );
    }
  }

  private addToken(request: HttpRequest<any>): HttpRequest<any> {
    return this.authFacade.idToken
      ? request.clone({
          setHeaders: { Authorization: this.authFacade.idToken },
        })
      : request;
  }
}
