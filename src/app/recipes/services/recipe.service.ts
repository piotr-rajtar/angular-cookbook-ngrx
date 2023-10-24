import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../../shopping/models/ingredient';
import { ShoppingService } from '../../shopping/services/shopping.service';

import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] = [];

  recipeListChange = new Subject<void>();

  constructor(private shoppingService: ShoppingService){}

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
    this.shoppingService.addIngredientList(ingredients);
  }
}
