import { Component } from '@angular/core';

import { Recipe } from '../models';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipeList.component.html',
  styleUrls: ['./recipeList.component.scss']
})
export class RecipeList {
  recipes: Recipe[] = [
    {
      name: 'Test recipe name',
      description: 'Test recipe description',
      imagePath: 'https://cdn.pixabay.com/photo/2020/06/15/18/21/croissants-5302909_1280.jpg',
    },
    {
      name: 'Test recipe name',
      description: 'Test recipe description',
      imagePath: 'https://cdn.pixabay.com/photo/2020/06/15/18/21/croissants-5302909_1280.jpg',
    },
  ];
}
