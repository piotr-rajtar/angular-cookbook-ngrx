import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { authGuard } from '../../auth/router/guards/auth.guard';

import { RecipeContainer } from '../components/recipeContainer/recipeContainer.component';
import { RecipeDetail } from '../components/recipeDetail/recipeDetail.component';
import { RecipeEditComponent } from '../components/recipeEdit/recipeEdit.component';
import { RecipeNoSelectionComponent } from '../components/recipeNoSelection/recipeNoSelection.component';

import { recipeResolver } from './resolvers/recipe.resolver';

const routes: Routes = [
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
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class RecipesRoutingModule { }
