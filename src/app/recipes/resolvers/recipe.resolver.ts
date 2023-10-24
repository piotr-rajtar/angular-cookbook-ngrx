import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';

import { DataStorageService } from '../../services/data-storage.service';

import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';

export const recipeResolver: ResolveFn<Observable<Recipe[]> | Recipe[]> = (
  _route, _state
) => {
  const dataStorageService = inject(DataStorageService);
  const recipeService = inject(RecipeService);

  const recipes: Recipe[] = recipeService.getRecipes();

  if(!recipes.length) {
    //TU NIE DAJEMY SUBSCRIBE, ANGULAR SAM SOBIE TO SUBSKRYBUJE
    return dataStorageService.fetchRecipes();
  }
  return recipes;
}
