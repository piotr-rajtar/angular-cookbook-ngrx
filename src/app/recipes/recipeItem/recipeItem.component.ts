import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Recipe } from '../models';

@Component({
  selector: 'recipe-item',
  templateUrl: './recipeItem.component.html',
  styleUrls: ['./recipeItem.component.scss']
})
export class RecipeItem {
  @Input({ required: true }) recipe!: Recipe;

  @Output() recipeSelect = new EventEmitter<void>();

  onRecipeClick() {
    this.recipeSelect.emit();
  }
}
