import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DirectivesModule } from './directives/directives.module';
import { RecipesModule } from './recipes/recipes.module';
import { AppRoutingModule } from './router/app-routing.module';

import { AppComponent } from './app.component';

import { AlertComponent } from './components/alert/alert.component';
import { AppHeader } from './appHeader/appHeader.component';
import { AuthComponent } from './auth/auth.component';

import { ShoppingListContainer } from './shopping/shoppingListContainer/shoppingListContainer.component';
import { ShoppingList } from './shopping/shoppingList/shoppingList.component';
import { ShoppingListEdit } from './shopping/shoppingListEdit/shoppingListEdit.component';


import { authInterceptorProvider } from './router/interceptors';

@NgModule({
  declarations: [
    //COMPONENTS
    AlertComponent,
    AppComponent,
    AppHeader,
    AuthComponent,
    ShoppingListContainer,
    ShoppingList,
    ShoppingListEdit,
  ],
  imports: [
    AppRoutingModule,
    //BROWSER MODULE POWINIEN BYĆ ZAIMPORTOWANY RAZ TYLKO W GŁÓWNYM MODULE
    //DO KAŻDEGO INNEGO MODUŁU, ZAMIAST NIEGO IMMPORTUJEMY COMMON MODULE
    BrowserModule,
    DirectivesModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RecipesModule,
  ],
  providers: [
    authInterceptorProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
