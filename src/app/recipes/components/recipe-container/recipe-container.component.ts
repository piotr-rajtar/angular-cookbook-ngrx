import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe.service';

import { RecipeList } from '../recipe-list/recipe-list.component';

@Component({
  standalone: true,
  imports: [RouterModule, RecipeList],
  selector: 'recipe-container',
  templateUrl: './recipe-container.component.html',
  styleUrls: ['./recipe-container.component.scss']
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
