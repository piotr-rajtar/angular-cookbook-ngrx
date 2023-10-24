import { Component } from '@angular/core';

import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './appHeader.component.html',
  styleUrls: ['./appHeader.component.scss'],
})
export class AppHeader {
  constructor(private dataStorageService: DataStorageService) { }

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

  fetchData(): void {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  saveData(): void {
    this.dataStorageService.storeRecipes();
  }
}
