import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TOKEN_KEY } from '../constants';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = `${environment.apiBaseUrl}/users`;

  constructor(private http: HttpClient) {}

  signUp(formData: any): Observable<any> {
    /*
      ! Warning
      Default value for Role, Gender, Age, LibraryId?
      instead of registration form, there should be some other
      form to update these details of the user
    */
    return this.http.post(`${this.baseUrl}/signup`, formData);
  }

  signIn(formData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signin`, formData);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null ? true : false;
  }

  saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  getClaims() {
    const claims = JSON.parse(window.atob(this.getToken()!.split('.')[1])); // Decode token

    return claims;
  }
}
