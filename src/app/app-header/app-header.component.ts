import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { authActions } from '../auth/store/auth.actions';
import { selectAuthUser } from '../auth/store/auth.selectors';
import { recipesActions } from '../recipes/store/recipes.actions';
import { selectRecipesState } from '../recipes/store/recipes.selectors';
import { AlertComponent } from '../shared/components/alert/alert.component';
import { ClickOutsideDirective } from '../shared/directives/clickOutside.directive';
import { DropdownDirective } from '../shared/directives/dropdown.directive';
import { AlertType } from '../shared/models';
import { AppState } from '../store/types';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AlertComponent,
    ClickOutsideDirective,
    DropdownDirective,
  ],
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeader implements OnDestroy, OnInit {
  isAuthenticated: boolean = false;
  authStateSubscription!: Subscription;
  recipeStateSubscription!: Subscription;
  dbErrorMessage: string | null = null;
  dbSuccessMessage: string | null = null;

  AlertType = AlertType;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.authStateSubscription = this.store.select(selectAuthUser).subscribe(user => {
      this.isAuthenticated = !!user;
    });

    this.recipeStateSubscription = this.store.select(selectRecipesState)
      .subscribe(recipesState => {
        this.dbErrorMessage = recipesState.dbErrorMessage;
        this.dbSuccessMessage = recipesState.dbSuccessMessage;
      });
  }

  ngOnDestroy(): void {
    this.authStateSubscription.unsubscribe();
    this.recipeStateSubscription.unsubscribe();
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

  closeErrorAlert(): void {
    this.store.dispatch(recipesActions.clearDbErrorMessage());
  }

  closeSuccessAlert(): void {
    this.store.dispatch(recipesActions.clearDbSuccessMessage());
  }

  fetchData(): void {
    this.store.dispatch(recipesActions.fetchRecipes());
  }

  saveData(): void {
    this.store.dispatch(recipesActions.storeRecipes());
  }

  logout(): void {
    this.store.dispatch(authActions.logout());
  }
}
