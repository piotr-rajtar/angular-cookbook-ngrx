import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    CommonModule,
    FormsModule,
    ShoppingRoutingModule,
  ]
})
export class ShoppingModule { }
