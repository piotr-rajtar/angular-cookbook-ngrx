import { createReducer, on } from '@ngrx/store';

import { Recipe } from '../models/recipe';
import { recipesActions } from '../store/recipes.actions';


export const RECIPES_FEATURE_KEY = 'recipes';

export interface RecipesState {
  recipes: Recipe[];
  dbErrorMessage: string | null;
  dbSuccessMessage: string | null;
}

const initialState: RecipesState = {
  recipes: [],
  dbErrorMessage: null,
  dbSuccessMessage: null,
};

export const recipesReducer = createReducer(
  initialState,
  on(recipesActions.addRecipe, (state, action) => {
    return {
      ...state,
      recipes: [...state.recipes, action.newRecipe],
    };
  }),
  on(recipesActions.clearDbErrorMessage, state => {
    return {
      ...state,
      dbErrorMessage: null,
    }
  }),
  on(recipesActions.clearDbSuccessMessage, state => {
    return {
      ...state,
      dbSuccessMessage: null,
    }
  }),
  on(recipesActions.deleteRecipe, (state, action) => {
    return {
      ...state,
      recipes: state.recipes.filter(recipe => recipe.id !== action.recipeId),
    };
  }),
  on(recipesActions.setDbErrorMessage, (state, action) => {
    return {
      ...state,
      dbErrorMessage: action.message,
    };
  }),
  on(recipesActions.setDbSuccessMessage, (state, action) => {
    return {
      ...state,
      dbSuccessMessage: action.message,
    };
  }),
  on(recipesActions.setRecipes, (state, actions) => {
    return {
      ...state,
      recipes: actions.newRecipes,
    };
  }),
  on(recipesActions.updateRecipe, (state, action) => {
    return {
      ...state,
      recipes: state.recipes.map(recipe => {
        if(recipe.id !== action.updatedRecipe.id) {
          return recipe;
        }

        return {
          ...recipe,
          name: action.updatedRecipe.name,
          description: action.updatedRecipe.description,
          imagePath: action.updatedRecipe.imagePath,
          ingredients: action.updatedRecipe.ingredients,
        };
      }),
    };
  }),
);
