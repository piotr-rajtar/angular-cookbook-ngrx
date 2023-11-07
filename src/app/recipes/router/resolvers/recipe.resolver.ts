import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';

import { Recipe } from '../../../recipes/models/recipe';
import { AppState } from '../../../store/types';

import { recipesActions } from '../../store/recipes.actions';
import { selectRecipes } from '../../store/recipes.selectors';

export const recipeResolver: ResolveFn<Observable<Recipe[]> | Recipe[]> = (
  _route, _state
) => {
  const store = inject(Store<AppState>);

  return store.select(selectRecipes).pipe(
    take(1),
    map(recipes => {
      if(recipes.length) {
        return recipes;
      }

      store.dispatch(recipesActions.fetchRecipes());
      return [];
    })
  );
}
