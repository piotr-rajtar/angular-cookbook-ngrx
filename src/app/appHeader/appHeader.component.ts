import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/services/auth.service';
import { PlaceholderDirective } from '../directives/placeholder.directive';
import { DataStorageService } from '../services/data-storage.service';
import { AlertComponent } from '../components/alert/alert.component';
import { AlertType } from '../models';

@Component({
  selector: 'app-header',
  templateUrl: './appHeader.component.html',
  styleUrls: ['./appHeader.component.scss'],
})
export class AppHeader implements OnDestroy, OnInit {
  isAuthenticated: boolean = false;
  closeAlertSubscription!: Subscription;
  userSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService,
  ) { }

  @ViewChild(PlaceholderDirective) alertHost!: PlaceholderDirective;

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();

    if(this.closeAlertSubscription) {
      this.closeAlertSubscription.unsubscribe();
    }
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
    this.dataStorageService.fetchRecipes().subscribe(() => {
      const message = 'Data fetched successfully';
      this.showSuccessAlert(message);
    });
  }

  saveData(): void {
    this.dataStorageService.storeRecipes().subscribe(() => {
      const message = 'Data saved successfully';
      this.showSuccessAlert(message);
    });
  }

  showSuccessAlert(message: string): void {
    const viewContainerRef = this.alertHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<AlertComponent>(AlertComponent);
    componentRef.instance.message = message;
    componentRef.instance.type = AlertType.SUCCESS;

    this.closeAlertSubscription = componentRef.instance.close.subscribe(() => {
      this.closeAlertSubscription.unsubscribe();
      viewContainerRef.clear();
    })
  }

  logout(): void {
    this.authService.logout();
  }
}
