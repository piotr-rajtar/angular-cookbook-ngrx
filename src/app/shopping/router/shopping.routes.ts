import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../components/shopping-list-container/shopping-list-container.component')
      .then(m => m.ShoppingListContainer),
  },
];
