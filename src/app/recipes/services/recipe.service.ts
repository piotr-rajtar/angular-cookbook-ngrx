import { Injectable } from '@angular/core';

import { Ingredient } from '../../shopping/models';
import { ShoppingService } from '../../shopping/services/shopping.service';

import { Recipe } from '../models/index';

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
          name: 'butter',
          amount: 1,
        },
        {
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
          name: 'butter',
          amount: 2,
        },
        {
          name: 'oil',
          amount: 1,
        }
      ],
    },
  ];

  constructor(private shoppingService: ShoppingService){}

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
