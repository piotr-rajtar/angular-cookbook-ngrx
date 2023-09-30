import { Component } from '@angular/core';

import { NavigationItem } from './appHeader/appHeader.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  NavigationItem = NavigationItem;

  activeNavigationItem: NavigationItem = NavigationItem.RECIPES;

  onNavigationClick(navigationItem: NavigationItem) {
    this.activeNavigationItem = navigationItem;
  }
}
