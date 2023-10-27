import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full',
  },
  {
    path: 'recipes',
    loadChildren: () => import('../recipes/recipes.module').then(m => m.RecipesModule),
  },
  {
    path: 'shopping-list',
    loadChildren: () => import('../shopping/shopping.module').then(m => m.ShoppingModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule),
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      routes,
      {
        preloadingStrategy: PreloadAllModules,
      }
    )
  ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }
