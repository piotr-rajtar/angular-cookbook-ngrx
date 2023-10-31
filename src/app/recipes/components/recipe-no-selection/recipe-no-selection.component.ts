import { Component } from '@angular/core';

import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-no-selection',
  templateUrl: './recipe-no-selection.component.html',
  styleUrls: ['./recipe-no-selection.component.scss']
})
export class RecipeNoSelectionComponent {
  constructor(private recipesService: RecipeService) {}

  get title(): string {
    return !!this.recipesService.getRecipes().length
     ? 'Please select a receipe!'
     : 'Please add a recipe!';
  }
}
