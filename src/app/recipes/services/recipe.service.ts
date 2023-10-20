import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../../shopping/models/ingredient';
import { ShoppingService } from '../../shopping/services/shopping.service';

import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] = [
    {
      id: '0',
      name: 'Test recipe name1',
      description: 'Test recipe description1',
      imagePath: 'https://cdn.pixabay.com/photo/2020/06/15/18/21/croissants-5302909_1280.jpg',
      ingredients: [
        {
          id: 1,
          name: 'butter',
          amount: 1,
        },
        {
          id: 2,
          name: 'flour',
          amount: 2,
        }
      ],
    },
    {
      id: '1',
      name: 'Test recipe name2',
      description: 'Test recipe description2',
      imagePath: 'https://cdn.pixabay.com/photo/2020/06/15/18/21/croissants-5302909_1280.jpg',
      ingredients: [
        {
          id: 3,
          name: 'butter',
          amount: 2,
        },
        {
          id: 4,
          name: 'oil',
          amount: 1,
        }
      ],
    },
  ];

  recipeListChange = new Subject<void>();

  constructor(private shoppingService: ShoppingService){}

  addRecipe(newRecipe: Recipe): void {
    this.recipes.push(newRecipe);

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
