import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('request: ', req);

  const authService = inject(AuthService);

  if (authService.isLoggedIn()) {
    // Modify the request header with token
    const clonedRequest = req.clone({
      headers: req.headers.set(
        'Authorization',
        'Bearer ' + authService.getToken()
      ),
    });

    return next(clonedRequest);
  }

  return next(req);
};
