import { createSelector } from '@ngrx/store';
import { ShoppingListState } from './shopping-list.reducer';

export const selectIngredients = (state: ShoppingListState) => state.ingredients;

export const selectIngredient = (ingredientId: string) => createSelector(
  selectIngredients,
  ingredients => ingredients.find(ingredient => ingredient.id === ingredientId)
);
