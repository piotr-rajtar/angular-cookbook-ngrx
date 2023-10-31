import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth/services/auth.service';
import { RouterModule } from '@angular/router';
import { AppHeader } from './app-header/app-header.component';

@Component({
  standalone: true,
  imports: [RouterModule, AppHeader],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
