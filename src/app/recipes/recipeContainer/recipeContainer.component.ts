import { Component } from '@angular/core';

import { Recipe } from '../models';

@Component({
  selector: 'recipe-container',
  templateUrl: './recipeContainer.component.html',
  styleUrls: ['./recipeContainer.component.scss']
})
export class RecipeContainer {
  recipes: Recipe[] = [
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

  selectedRecipe: Recipe | null = null;

  onRecipeSelect(selectedRecipe: Recipe) {
    this.selectedRecipe = selectedRecipe;
  }
}
