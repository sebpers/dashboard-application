import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = `${environment.apiBaseUrl}/users`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserProfile(): Observable<any> {
    return this.http
      .get(this.baseUrl + '/user-profile')
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);

    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
