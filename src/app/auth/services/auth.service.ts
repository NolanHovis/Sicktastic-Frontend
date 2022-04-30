import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/user.model';

interface LoginData {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:3000/api/v1/users/';
  tokenExp: Date = new Date();
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  login(form: LoginData) {
    return this.http.post(this.apiUrl + 'login', form).pipe(
      map((res: any) => {
        const user = res;
        console.log(user);
        if (user.success) {
          localStorage.setItem('Bearer', user.payload.token.value);
          const newUser = new User(
            user.payload.user.email,
            user.payload.user.first_name,
            user.payload.user.last_name,
            user.payload.user.blogs,
            user.payload.user.id,
            user.payload.token
          );
          this.user.next(newUser);
        }
      })
    );
  }

  register(form: LoginData) {
    return this.http.post(this.apiUrl + 'create', form).pipe(
      map(() => {
        this.router.navigate(['/login']);
      })
    );
  }

  logout() {
    let headers = new HttpHeaders({
      Authorization: `Bearer ` + this.getToken(),
    });

    const options = { headers };
    return this.http
      .delete(this.apiUrl + 'logout', options)
      .subscribe((res: any) => {
        const loggedOut = res;
        if (loggedOut.success) {
          console.log(res);
          this.user.next(null);
          this.router.navigate(['/login']);
        }
      });
  }

  // loggedIn() {
  //   return !this.tokenExpired();
  // }

  tokenExpired() {
    if (this.tokenExp < new Date()) {
      return true;
    }

    return false;
  }

  getToken() {
    let token = localStorage.getItem('Bearer');
    return token;
  }
}
