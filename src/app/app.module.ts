import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './router/app-routing.module';

import { AppComponent } from './app.component';

import { AppHeader } from './appHeader/appHeader.component';

import { RecipeContainer } from './recipes/recipeContainer/recipeContainer.component';
import { RecipeDetail } from './recipes/recipeDetail/recipeDetail.component';
import { RecipeEditComponent } from './recipes/recipeEdit/recipeEdit.component';
import { RecipeItem } from './recipes/recipeItem/recipeItem.component';
import { RecipeList } from './recipes/recipeList/recipeList.component';
import { RecipeNoSelectionComponent } from './recipes/recipeNoSelection/recipeNoSelection.component';

import { ShoppingListContainer } from './shopping/shoppingListContainer/shoppingListContainer.component';
import { ShoppingList } from './shopping/shoppingList/shoppingList.component';
import { ShoppingListEdit } from './shopping/shoppingListEdit/shoppingListEdit.component';

import { ClickOutsideDirective } from './directives/clickOutside.directive';
import { DropdownDirective } from './directives/dropdown.directive';

@NgModule({
  declarations: [
    //COMPONENTS
    AppComponent,
    AppHeader,
    RecipeContainer,
    RecipeDetail,
    RecipeEditComponent,
    RecipeItem,
    RecipeList,
    RecipeNoSelectionComponent,
    ShoppingListContainer,
    ShoppingList,
    ShoppingListEdit,
    //DIRECTIVES
    ClickOutsideDirective,
    DropdownDirective,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
