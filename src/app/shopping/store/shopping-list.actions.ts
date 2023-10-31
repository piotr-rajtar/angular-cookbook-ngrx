import { createAction, props } from '@ngrx/store';

import { Ingredient } from '../models/ingredient';

export const addIngredient = createAction(
  '[ShoppingList] Add Ingredient',
  props<{ ingredient: Ingredient }>()
);

export const addIngredientsList = createAction(
  '[ShoppingList] Add Ingredients',
  props<{ ingredients: Ingredient[] }>()
);

export const deleteIngredient = createAction(
  '[ShoppingList] Delete Ingredient',
  props<{ ingredientId: string }>()
);

export const updateIngredient = createAction(
  '[ShoppingList] Update Ingredient',
  props<{ updatedIngredient: Ingredient }>()
);
