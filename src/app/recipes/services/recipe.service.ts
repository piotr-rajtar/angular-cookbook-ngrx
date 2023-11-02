import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import { AppState } from '../../store/types';
import { Ingredient } from '../../shopping/models/ingredient';
import { shoppingListActions } from '../../shopping/store/shopping-list.actions';

import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] = [];

  recipeListChange = new Subject<void>();

  constructor(private store: Store<AppState>) {}

  addRecipe(newRecipe: Recipe): void {
    this.recipes.push(newRecipe);

    this.recipeListChange.next();
  }

  setRecipes(newRecipes: Recipe[]): void {
    this.recipes = newRecipes;

    this.recipeListChange.next();
  }

  updateRecipe(updatedRecipe: Recipe) {
    const recipeToUpdate: Recipe = this.recipes.find(
      recipe => recipe.id === updatedRecipe.id
    ) as Recipe;
    const indexOfRecipeToUpdate = this.recipes.indexOf(recipeToUpdate);
    this.recipes.splice(indexOfRecipeToUpdate, 1, updatedRecipe);

    this.recipeListChange.next();
  }

  deleteRecipe(recipeId: string) {
    const filteredRecipes: Recipe[] = this.recipes.filter(
      recipe => recipe.id !== recipeId
    );

    this.recipes = filteredRecipes;
    this.recipeListChange.next();
  }

  getRecipes(): Recipe[] {
    return structuredClone(this.recipes);
  }

  getRecipe(id: string): Recipe | undefined {
    return this.recipes.find(recipe => recipe.id === id);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(shoppingListActions.addIngredients({ ingredients }));
  }
}
