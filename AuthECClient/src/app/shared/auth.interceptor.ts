import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    // Modify the request header with token
    const clonedRequest = req.clone({
      headers: req.headers.set(
        'Authorization',
        'Bearer ' + authService.getToken()
      ),
    });

    return next(clonedRequest).pipe(
      tap({
        error: (err: any) => {
          if (err.status === 401) {
            // Unauthenticated user - has no valid token
            authService.removeToken();
            setTimeout(() => {
              alert('Session expired, please login to continue.');
            }, 1500);
            router.navigateByUrl('/signin');
          } else if (err.status === 403) {
            alert(
              "Ooops! It seems you're not authorized to perform the action."
            );
          }
        },
      })
    );
  }

  return next(req);
};
