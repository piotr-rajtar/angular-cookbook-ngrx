import { createSelector } from '@ngrx/store';

import { AppState } from '../../store/types';

import { Ingredient } from '../models/ingredient';

import { ShoppingListState } from './shopping-list.reducer';

export const selectShoppingList = (state: AppState) => {
  return state.shoppingList;
};

export const selectShoppingListIngredients = createSelector(
  selectShoppingList,
  (shoppingList: ShoppingListState) => shoppingList.ingredients
);

export const selectShoppingListIngredient = (ingredientId: string) => createSelector(
  selectShoppingListIngredients,
  (ingredients: Ingredient[]) => ingredients.find(
    ingredient => ingredient.id === ingredientId
  )
);

export const selectShoppingListEditItemId = createSelector(
  selectShoppingList,
  (shoppingList: ShoppingListState) => shoppingList.editedItemId
);
