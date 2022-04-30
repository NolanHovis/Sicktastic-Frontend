import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [CommonModule, AuthRoutingModule, FormsModule, SharedModule],
  exports: [RegisterComponent, LoginComponent],
})
export class AuthModule {}
