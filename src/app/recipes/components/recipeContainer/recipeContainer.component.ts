import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'recipe-container',
  templateUrl: './recipeContainer.component.html',
  styleUrls: ['./recipeContainer.component.scss']
})
export class RecipeContainer implements OnDestroy, OnInit {
  recipes: Recipe[] = [];
  recipeListChangeSubscription!: Subscription;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes()

    this.recipeListChangeSubscription = this.recipeService.recipeListChange.subscribe(() => {
      this.recipes = this.recipeService.getRecipes();
    });
  }

  ngOnDestroy(): void {
    this.recipeListChangeSubscription.unsubscribe();
  }
}
