import { createReducer, on } from '@ngrx/store';

import { Ingredient } from '../models/ingredient';

import * as ShoppingListActions from './shopping-list.actions';

export const SHOPPING_LIST_FEATURE_KEY = 'shoppingList';

export interface ShoppingListState {
  ingredients: Ingredient[];
  editedItemId: string | null;
}

const initialState: ShoppingListState = {
  ingredients: [],
  editedItemId: null,
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
  on(ShoppingListActions.deleteIngredient, state => {
    return {
      ...state,
      ingredients: state.ingredients.filter(
        ingredient => ingredient.id !== state.editedItemId
      ),
    }
  }),
  on(ShoppingListActions.startEdit, (state, action) => {
    return {
      ...state,
      editedItemId: action.ingredientId,
    }
  }),
  on(ShoppingListActions.stopEdit, state => {
    return {
      ...state,
      editedItemId: null,
    }
  }),
  on(ShoppingListActions.updateIngredient, (state, action) => {
    return {
      ...state,
      ingredients: state.ingredients.map(ingredient => {
        if(ingredient.id !== state.editedItemId) {
          return ingredient;
        }

        return {
          ...ingredient,
          name: action.ingredientDataToEdit.name,
          amount: action.ingredientDataToEdit.amount,
        };
      }),
    };
  }),
);
