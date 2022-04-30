import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    const authObs = {
      next: (user: any) => console.log(user),
      error: (err: any) => console.log(err),
      complete: () => this.router.navigate(['/home']),
    };
    this.authService.login(form.value).subscribe(authObs);
  }
}
