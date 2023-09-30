import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Recipe } from '../models';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipeList.component.html',
  styleUrls: ['./recipeList.component.scss']
})
export class RecipeList {
  @Input({ required: true }) recipes!: Recipe[];

  @Output() recipeSelect = new EventEmitter<Recipe>();

  onRecipeClick(selectedRecipe: Recipe) {
    this.recipeSelect.emit(selectedRecipe);
  }
}
