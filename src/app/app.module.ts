import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AppHeader } from './appHeader/appHeader.component';

import { ReceipeDetail } from './recipes/recipeDetail/recipeDetail.component';
import { ReceipeItem } from './recipes/recipeItem/recipeItem.component';
import { ReceipeList } from './recipes/recipeList/recipeList.component';

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
