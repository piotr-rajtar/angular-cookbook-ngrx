import { createSelector } from '@ngrx/store';

import { AppState } from '../../store/types';

import { RecipesState } from './recipes.reducer';

export const selectRecipesState = (state: AppState) => state.recipes;

export const selectRecipes = createSelector(
  selectRecipesState,
  (recipesState: RecipesState) => recipesState.recipes,
);

export const selectRecipe = (recipeId: string) => createSelector(
  selectRecipesState,
  (recipesState: RecipesState) => recipesState.recipes.find(
    recipe => recipe.id === recipeId
  ),
);
