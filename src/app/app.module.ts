import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AppHeader } from './appHeader/appHeader.component';

import { RecipeDetail } from './recipes/recipeDetail/recipeDetail.component';
import { RecipeItem } from './recipes/recipeItem/recipeItem.component';
import { RecipeList } from './recipes/recipeList/recipeList.component';

import { ShoppingList } from './shopping/shoppingList/shoppingList.component';
import { ShoppingListEdit } from './shopping/shoppingListEdit/shoppingListEdit.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeader,
    RecipeDetail,
    RecipeItem,
    RecipeList,
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
