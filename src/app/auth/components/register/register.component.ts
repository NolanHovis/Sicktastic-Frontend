import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    const authObs = {
      next: (user: any) => console.log(user),
      error: (err: any) => console.log(err),
      complete: () => this.router.navigate(['/login']),
    };

    this.authService.register(form.value).subscribe(authObs);
  }
}
