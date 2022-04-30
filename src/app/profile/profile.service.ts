import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private authService: AuthService, private http: HttpClient) {}

  getCurrentUser() {
    return this.authService.user;
  }

  getMe() {
    let headers = new HttpHeaders({
      Authorization: `Bearer ` + this.authService.getToken(),
    });

    const options = { headers };
    return this.http
      .get('http://localhost:3000/api/v1/users/me', options)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
