import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { ShoppingRoutingModule } from './router/shopping-routing.module';

import { ShoppingList } from './components/shoppingList/shoppingList.component';
import { ShoppingListContainer } from './components/shoppingListContainer/shoppingListContainer.component';
import { ShoppingListEdit } from './components/shoppingListEdit/shoppingListEdit.component';

@NgModule({
  declarations: [
    ShoppingListContainer,
    ShoppingList,
    ShoppingListEdit,
  ],
  imports: [
    FormsModule,
    SharedModule,
    ShoppingRoutingModule,
  ]
})
export class ShoppingModule { }
