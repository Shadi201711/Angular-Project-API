import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {

  private IsLoggedSubject: BehaviorSubject<boolean>;
  private IsAdminSubject: BehaviorSubject<boolean>;

  loginObj: any =
    {
      "email": '',
      "password": ''
    };

  baseURL: string = 'https://localhost:7191/api/Login';

  constructor(private httpclient: HttpClient) {
    this.IsLoggedSubject = new BehaviorSubject<boolean>(false);
    this.IsAdminSubject = new BehaviorSubject<boolean>(false);

  }
  login(email: string, password: string): Observable<boolean> {

    return this.httpclient.post<any>(`${this.baseURL}`, { email, password }).pipe(
      map(res => {
        if (res && res.success) {
          localStorage.setItem('LoginTokn', res.data.token);
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('IsAdmin', res.isAdmin.toString());
          this.IsLoggedSubject.next(true);
          if (res.isAdmin == true) {
            this.IsAdminSubject.next(true);
          }
          return true;
        }
        else {
          throw new Error(res.message || 'Login failed');
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        return of(false);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('LoginTokn');
    localStorage.removeItem('isLoggedIn');
    this.IsLoggedSubject.next(false);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getLoggedStatus() {
    return this.IsLoggedSubject;
  }
  getAdminStatus(): Observable<boolean> {
    const isAdminFromLocalStorage = localStorage.getItem('IsAdmin') === 'true';


    if (isAdminFromLocalStorage) {
      this.IsAdminSubject.next(isAdminFromLocalStorage);
      return this.IsAdminSubject.asObservable();
    }
    return this.IsAdminSubject.asObservable();
  }

  IsAdmin(): boolean {
    return localStorage.getItem('IsAdmin') === 'true';
  }
}
