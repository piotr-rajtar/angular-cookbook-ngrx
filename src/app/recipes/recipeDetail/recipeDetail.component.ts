import { Component, Input } from '@angular/core';

import { Recipe } from '../models';

@Component({
  selector: 'recipe-detail',
  templateUrl: './recipeDetail.component.html',
  styleUrls: ['./recipeDetail.component.scss']
})
export class RecipeDetail {
  @Input({ required: true }) recipe!: Recipe;
}
