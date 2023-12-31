import { importProvidersFrom, isDevMode } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';

import { authInterceptorProvider } from './app/auth/router/interceptors';
import { AUTH_FEATURE_KEY, authReducer } from './app/auth/store/auth.reducer';
import * as authEffects from './app/auth/store/auth.effects';
import * as recipesEffects from './app/recipes/store/recipes.effects';
import { RECIPES_FEATURE_KEY, recipesReducer } from './app/recipes/store/recipes.reducer';
import {
  SHOPPING_LIST_FEATURE_KEY,
  shoppingListReducer,
} from './app/shopping/store/shopping-list.reducer';

import { routes } from './app/router/app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideStore(),
    provideState({ name: AUTH_FEATURE_KEY, reducer: authReducer }),
    provideState({ name: RECIPES_FEATURE_KEY, reducer: recipesReducer }),
    provideState({ name: SHOPPING_LIST_FEATURE_KEY, reducer: shoppingListReducer }),
    provideEffects(authEffects, recipesEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    authInterceptorProvider,
],
}).catch(err => console.error(err));
