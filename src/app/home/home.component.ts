import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private profService: ProfileService) {}

  ngOnInit(): void {
    this.profService.getMe();
  }
}
