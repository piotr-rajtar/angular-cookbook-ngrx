import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { provideState, provideStore } from '@ngrx/store';

import { authInterceptorProvider } from './app/auth/router/interceptors';
import { routes } from './app/router/app.routes';
import { AppComponent } from './app/app.component';

import {
  SHOPPING_LIST_FEATURE_KEY,
  shoppingListReducer,
} from './app/shopping/store/shopping-list.reducer';
import { AUTH_FEATURE_KEY, authReducer } from './app/auth/store/auth.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideStore(),
    provideState({ name: AUTH_FEATURE_KEY, reducer: authReducer }),
    provideState({ name: SHOPPING_LIST_FEATURE_KEY, reducer: shoppingListReducer }),
    authInterceptorProvider,
],
}).catch(err => console.error(err));
