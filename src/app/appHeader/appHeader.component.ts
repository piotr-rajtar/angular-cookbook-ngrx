import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/services/auth.service';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './appHeader.component.html',
  styleUrls: ['./appHeader.component.scss'],
})
export class AppHeader implements OnDestroy, OnInit {
  isAuthenticated: boolean = false;
  userSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService,
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

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

  logout(): void {
    this.authService.logout();
  }
}
