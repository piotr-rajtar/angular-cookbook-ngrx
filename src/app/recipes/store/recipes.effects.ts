import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';

import { AppState } from '../../store/types';

import { Recipe } from '../models/recipe';

import { recipesActions } from './recipes.actions';
import { selectRecipes } from './recipes.selectors';

export const fetchRecipes = createEffect(
  (
    actions$ = inject<Actions<Action>>(Actions),
    httpClient = inject(HttpClient)
  ) => {
    return actions$.pipe(
      ofType(recipesActions.fetchRecipes),
      switchMap(() => {
        return httpClient
          .get<Recipe[]>(
            'https://angular-cook-book-35d2a-default-rtdb.firebaseio.com/recipes.json'
          )
          .pipe(
            switchMap((recipes) => {
              const mappedRecipes = (recipes || []).map(recipe => {
                return {
                  ...recipe,
                  ingredients: recipe.ingredients || [],
                }
              });

              return of(
                recipesActions.setRecipes({ newRecipes: mappedRecipes }),
                recipesActions.setDbSuccessMessage({ message: 'Data fetched successfully' })
              );
            }),
            catchError(() =>
              of(recipesActions.setDbErrorMessage({
                message: 'An error while recipes fetching occured',
              }))
            ),
          );
      }),
    );
  },
  { functional: true }
);

export const storeRecipes = createEffect(
  (
    actions$ = inject<Actions<Action>>(Actions),
    httpClient = inject(HttpClient),
    store = inject(Store<AppState>)
  ) => {
    return actions$.pipe(
      ofType(recipesActions.storeRecipes),
      withLatestFrom(store.select(selectRecipes)),
      switchMap(([_storeRecipesAction, recipes]) => {
        return httpClient
        .put<Recipe[]>(
          'https://angular-cook-book-35d2a-default-rtdb.firebaseio.com/recipes.json',
          recipes
        )
        .pipe(
          map(() => recipesActions.setDbSuccessMessage({ message: 'Data stored successfully' })),
          catchError(() =>
            of(recipesActions.setDbErrorMessage({
              message: 'An error while recipes storing occured',
            }))
          ),
        )
      }),
    );
  },
  { functional: true }
)
