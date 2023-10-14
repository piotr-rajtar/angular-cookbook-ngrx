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

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }
}
