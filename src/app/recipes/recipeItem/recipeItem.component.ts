import { Component, Input } from '@angular/core';

import { Recipe } from '../models';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'recipe-item',
  templateUrl: './recipeItem.component.html',
  styleUrls: ['./recipeItem.component.scss']
})
export class RecipeItem {
  @Input({ required: true }) recipe!: Recipe;

  constructor(private recipeService: RecipeService){}

  onRecipeClick() {
    this.recipeService.selectRecipe.emit(this.recipe);
  }
}
