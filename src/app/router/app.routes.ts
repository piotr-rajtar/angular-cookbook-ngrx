import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full',
  },
  {
    path: 'recipes',
    loadChildren: () => import('../recipes/router/recipes.routes').then(m => m.routes),
  },
  {
    path: 'shopping-list',
    loadChildren: () => import('../shopping/router/shopping.routes').then(m => m.routes),
  },
  {
    path: 'auth',
    loadChildren: () => import('../auth/router/auth.routes').then(m => m.routes),
  },
];
