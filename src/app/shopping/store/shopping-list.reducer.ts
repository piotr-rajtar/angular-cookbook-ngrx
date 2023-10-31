import { createReducer, on } from '@ngrx/store';

import { Ingredient } from '../models/ingredient';

import * as ShoppingListActions from './shopping-list.actions';

export const SHOPPING_LIST_FEATURE_KEY = 'shoppingList';

export interface ShoppingListState {
  ingredients: Ingredient[],
}

const initialState: ShoppingListState = {
  ingredients: [],
};

export const shoppingListReducer = createReducer(
  initialState,
  on(ShoppingListActions.addIngredient, (state, action) => {
    return {
      ...state,
      ingredients: [...state.ingredients, action.ingredient],
    }
  }),
  on(ShoppingListActions.addIngredientsList, (state, action) => {
    return {
      ...state,
      ingredients: [...state.ingredients, ...action.ingredients],
    }
  }),
  on(ShoppingListActions.deleteIngredient, (state, action) => {
    return {
      ...state,
      ingredients: state.ingredients.filter(
        ingredient => ingredient.id !== action.ingredientId
      ),
    }
  }),
  on(ShoppingListActions.updateIngredient, (state, action) => {
    return {
      ...state,
      ingredients: state.ingredients.map(ingredient => {
        if(ingredient.id !== action.updatedIngredient.id) {
          return ingredient;
        }

        return {
          ...ingredient,
          name: action.updatedIngredient.name,
          amount: action.updatedIngredient.amount,
        };
      }),
    };
  }),
);
