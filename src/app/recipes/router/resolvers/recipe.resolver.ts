import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Recipe } from '../../../recipes/models/recipe';
import { RecipeService } from '../../../recipes/services/recipe.service';
import { DataStorageService } from '../../../shared/services/data-storage.service';

//RESOLVER MOŻE SŁUŻYĆ DO POZYSKIWANIA DANYCH PRZED ZAŁADOWANIEM ROUTA
//PIERWSZEŃSTWO PRZD RESOLVERAMI MAJĄ GUARDY
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
