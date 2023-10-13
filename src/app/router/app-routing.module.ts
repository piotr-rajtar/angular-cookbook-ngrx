import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeContainer } from '../recipes/recipeContainer/recipeContainer.component';
import { ShoppingListContainer } from '../shopping/shoppingListContainer/shoppingListContainer.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full',
  },
  {
    path: 'recipes',
    component: RecipeContainer,
  },
  {
    path: 'shopping-list',
    component: ShoppingListContainer,
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
