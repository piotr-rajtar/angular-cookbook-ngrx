import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppHeader } from './app-header/app-header.component';
import { authActions } from './auth/store/auth.actions';
import { AppState } from './store/types';

@Component({
  standalone: true,
  imports: [RouterModule, AppHeader],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(authActions.autoLogin());
  }
}
