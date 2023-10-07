import { Component, OnInit } from '@angular/core';

import { Recipe } from '../models';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'recipe-container',
  templateUrl: './recipeContainer.component.html',
  styleUrls: ['./recipeContainer.component.scss']
})
export class RecipeContainer implements OnInit {
  recipes: Recipe[] = [];
  selectedRecipe: Recipe | null = null;

  constructor(private recipeService: RecipeService){
    this.recipeService.selectRecipe.subscribe((selectedRecipe: Recipe) => {
      this.selectedRecipe = selectedRecipe;
    })
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }
}
