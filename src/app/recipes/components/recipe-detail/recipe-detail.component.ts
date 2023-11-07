import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscription, switchMap } from 'rxjs';

import { ClickOutsideDirective } from '../../../shared/directives/clickOutside.directive';
import { DropdownDirective } from '../../../shared/directives/dropdown.directive';
import { shoppingListActions } from '../../../shopping/store/shopping-list.actions';
import { AppState } from '../../../store/types';

import { Recipe } from '../../models/recipe';
import { selectRecipe } from '../../store/recipes.selectors';
import { recipesActions } from '../../store/recipes.actions';

@Component({
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective, DropdownDirective],
  selector: 'recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetail implements OnDestroy, OnInit {
  recipe?: Recipe;
  storeSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void {
    this.storeSubscription = this.route.params
      .pipe(
        map(params => params['id']),
        switchMap((recipeId: string) => {
          return this.store.select(selectRecipe(recipeId));
        })
      )
      .subscribe(recipe => {
        this.recipe = recipe;
      })
  }

  isDropdownOpen = false;

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  addToShoppingList(): void {
    this.store.dispatch(shoppingListActions.addIngredients({ ingredients: (this.recipe as Recipe).ingredients }));
    this.closeDropdown();
  }

  editRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  deleteRecipe(): void {
    this.store.dispatch(recipesActions.deleteRecipe(
      { recipeId: this.recipe?.id as string }
    ));

    this.router.navigate(['/recipes']);
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }
}
