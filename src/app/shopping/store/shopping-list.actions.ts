import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';

import { Ingredient } from '../models/ingredient';
import { IngredientData } from '../models';

// GROUPED ACTIONS

export const shoppingListActions = createActionGroup({
  source: 'ShoppingList',
  events: {
    'Add Ingredient': props<{ ingredient: Ingredient }>(),
    'Add Ingredients': props<{ ingredients: Ingredient[] }>(),
    'Delete Ingredient': emptyProps(),
    'UpdateIngredient': props<{ ingredientDataToEdit: IngredientData }>(),
    'Start Edit': props<{ ingredientId: string }>(),
    'Stop Edit': emptyProps(),
  },
});

//SEPARATED ACTIONS

// export const addIngredient = createAction(
//   '[ShoppingList] Add Ingredient',
//   props<{ ingredient: Ingredient }>()
// );

// export const addIngredientsList = createAction(
//   '[ShoppingList] Add Ingredients',
//   props<{ ingredients: Ingredient[] }>()
// );

// export const deleteIngredient = createAction(
//   '[ShoppingList] Delete Ingredient',
// );

// export const startEdit = createAction(
//   '[ShoppingList] Start Edit',
//   props<{ ingredientId: string }>()
// )

// export const stopEdit = createAction(
//   '[ShoppingList] Stop Edit'
// )

// export const updateIngredient = createAction(
//   '[ShoppingList] Update Ingredient',
//   props<{ ingredientDataToEdit: IngredientData }>()
// );
