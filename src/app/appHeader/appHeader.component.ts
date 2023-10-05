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

  isMenuDropdownOpen = false;

  closeMenuDropdown(): void {
    this.isMenuDropdownOpen = false;
  }

  toggleMenuDropdown(): void {
    this.isMenuDropdownOpen = !this.isMenuDropdownOpen;
  }

  isOptionDropdownOpen = false;

  closeOptionDropdown(): void {
    this.isOptionDropdownOpen = false;
  }

  toggleDropdown(): void {
    this.isOptionDropdownOpen = !this.isOptionDropdownOpen;
  }

  onNavigationLinkClick(navigationItem: NavigationItem): void {
    this.navigate.emit(navigationItem);
  }
}
