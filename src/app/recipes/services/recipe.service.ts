import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from '../models/index';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] = [
    {
      name: 'Test recipe name1',
      description: 'Test recipe description1',
      imagePath: 'https://cdn.pixabay.com/photo/2020/06/15/18/21/croissants-5302909_1280.jpg',
    },
    {
      name: 'Test recipe name2',
      description: 'Test recipe description2',
      imagePath: 'https://cdn.pixabay.com/photo/2020/06/15/18/21/croissants-5302909_1280.jpg',
    },
  ];

  selectRecipe = new EventEmitter<Recipe>();

  getRecipes(): Recipe[] {
    return structuredClone(this.recipes);
  }
}
