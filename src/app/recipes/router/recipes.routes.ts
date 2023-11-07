import { Routes } from '@angular/router';

import { authGuard } from '../../auth/router/guards/auth.guard';

import { recipeResolver } from './resolvers/recipe.resolver';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('../components/recipe-container/recipe-container.component')
      .then(m => m.RecipeContainer),
    resolve: {
      recipeResolver,
    },
    children: [
      {
        path: '',
        loadComponent: () => import('../components/recipe-no-selection/recipe-no-selection.component')
          .then(m => m.RecipeNoSelectionComponent),
      },
      {
        path: 'add',
        loadComponent: () => import('../components/recipe-edit/recipe-edit.component')
          .then(m => m.RecipeEditComponent),
      },
      {
        path: ':id',
        loadComponent: () => import('../components/recipe-detail/recipe-detail.component')
          .then(m => m.RecipeDetail),
      },
      {
        path: ':id/edit',
        loadComponent: () => import('../components/recipe-edit/recipe-edit.component')
          .then(m => m.RecipeEditComponent),
      },
    ]
  },
];
