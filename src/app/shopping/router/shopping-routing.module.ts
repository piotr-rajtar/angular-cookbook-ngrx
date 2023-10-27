import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingListContainer } from '../components/shoppingListContainer/shoppingListContainer.component';

const routes: Routes = [
  {
    path: '',
    component: ShoppingListContainer,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class ShoppingRoutingModule { }
