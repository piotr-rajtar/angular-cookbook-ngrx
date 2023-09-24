import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AppHeader } from './appHeader/appHeader.component';

import { ReceipeDetail } from './receipes/receipeDetail/receipeDetail.component';
import { ReceipeItem } from './receipes/receipeItem/receipeItem.component';
import { ReceipeList } from './receipes/receipeList/receipeList.component';

import { ShoppingList } from './shopping/shoppingList/shoppingList.component';
import { ShoppingListEdit } from './shopping/shoppingListEdit/shoppingListEdit.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeader,
    ReceipeDetail,
    ReceipeItem,
    ReceipeList,
    ShoppingList,
    ShoppingListEdit,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
