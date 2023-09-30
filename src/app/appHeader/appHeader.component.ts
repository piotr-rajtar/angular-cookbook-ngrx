import { Component, EventEmitter, Output } from '@angular/core';

import { NavigationItem } from './appHeader.model';

@Component({
  selector: 'app-header',
  templateUrl: './appHeader.component.html',
  styleUrls: ['./appHeader.component.scss'],
})
export class AppHeader {
  @Output() navigate = new EventEmitter<NavigationItem>();

  NavigationItem = NavigationItem;

  onNavigationLinkClick(navigationItem: NavigationItem): void {
    this.navigate.emit(navigationItem);
  }
}
