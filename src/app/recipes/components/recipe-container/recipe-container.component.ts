import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from '../../../store/types';

import { Recipe } from '../../models/recipe';
import { selectRecipes } from '../../store/recipes.selectors';

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
  storeSubscription!: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.storeSubscription = this.store.select(selectRecipes).subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }
}
