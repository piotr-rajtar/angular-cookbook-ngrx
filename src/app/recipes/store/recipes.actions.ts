import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Recipe } from '../models/recipe';

export const recipesActions = createActionGroup({
  source: 'Recipes',
  events: {
    'AddRecipe': props<{ newRecipe: Recipe }>(),
    'ClearDbErrorMessage': emptyProps(),
    'ClearDbSuccessMessage': emptyProps(),
    'DeleteRecipe': props<{ recipeId: string }>(),
    'FetchRecipes': emptyProps(),
    'SetDbErrorMessage': props<{ message: string }>(),
    'SetDbSuccessMessage': props<{ message: string }>(),
    'SetRecipes': props<{ newRecipes: Recipe[] }>(),
    'StoreRecipes': emptyProps(),
    'UpdateRecipe': props<{ updatedRecipe: Recipe }>(),
  }
})
