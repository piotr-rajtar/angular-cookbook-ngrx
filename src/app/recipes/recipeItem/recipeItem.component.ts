import { Component, Input } from '@angular/core';

import { Recipe } from '../models/recipe';

@Component({
  selector: 'recipe-item',
  templateUrl: './recipeItem.component.html',
  styleUrls: ['./recipeItem.component.scss']
})
export class RecipeItem {
  @Input({ required: true }) recipe!: Recipe;
}
