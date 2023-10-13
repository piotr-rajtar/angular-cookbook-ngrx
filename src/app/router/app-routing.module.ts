import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeContainer } from '../recipes/recipeContainer/recipeContainer.component';
import { ShoppingContainer } from '../shopping/shoppingContainer/shoppingContainer.component';

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
    component: ShoppingContainer,
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
