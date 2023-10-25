import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeContainer } from '../recipes/recipeContainer/recipeContainer.component';
import { RecipeDetail } from '../recipes/recipeDetail/recipeDetail.component';
import { RecipeEditComponent } from '../recipes/recipeEdit/recipeEdit.component';
import { RecipeNoSelectionComponent } from '../recipes/recipeNoSelection/recipeNoSelection.component';
import { recipeResolver } from '../recipes/resolvers/recipe.resolver';

import { ShoppingListContainer } from '../shopping/shoppingListContainer/shoppingListContainer.component';

import { AuthComponent } from '../auth/auth.component';

import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full',
  },
  {
    path: 'recipes',
    canActivate: [authGuard],
    component: RecipeContainer,
    //WYNIOSŁEM TO WYŻEJ
    //PRZY KLIKNIĘCIU W RECIPE BOOK, ŁADOWAŁA SIĘ STRONA GŁÓWNA BEZ PRZEPISÓW
    //MIMO, ŻE ZOSTAŁY ZFETCHOWANE PRZY WEJŚCIU NA LINK EDIT, CZY SAMYCH SZCZEGÓŁÓW
    //ZMIANA DLA POPRAWY UX
    resolve: {
      recipeResolver,
    },
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
        // resolve: {
        //   recipeResolver,
        // },
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        // resolve: {
        //   recipeResolver,
        // },
      },
    ]
  },
  {
    path: 'shopping-list',
    component: ShoppingListContainer,
  },
  {
    path: 'auth',
    component: AuthComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
