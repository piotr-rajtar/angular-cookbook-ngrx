import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeContainer } from '../recipes/recipeContainer/recipeContainer.component';
import { RecipeDetail } from '../recipes/recipeDetail/recipeDetail.component';
import { RecipeEditComponent } from '../recipes/recipeEdit/recipeEdit.component';
import { RecipeNoSelectionComponent } from '../recipes/recipeNoSelection/recipeNoSelection.component';

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
    children: [
      {
        path: '',
        component: RecipeNoSelectionComponent,
      },
      {
        path: 'add',
        component: RecipeEditComponent,
      },
      {
        path: ':id',
        component: RecipeDetail,
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
      },
    ]
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
