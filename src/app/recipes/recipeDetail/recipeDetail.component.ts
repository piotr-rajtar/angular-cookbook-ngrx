import { Component, Input } from '@angular/core';

import { Recipe } from '../models';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'recipe-detail',
  templateUrl: './recipeDetail.component.html',
  styleUrls: ['./recipeDetail.component.scss']
})
export class RecipeDetail {
  @Input({ required: true }) recipe!: Recipe;

  constructor(private recipeService: RecipeService) {}

  isDropdownOpen = false;

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  addToShoppingList(): void {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.closeDropdown();
  }
}
