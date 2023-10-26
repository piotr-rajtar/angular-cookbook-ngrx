import { NgModule } from '@angular/core';

import { authInterceptorProvider } from './auth/router/interceptors';

@NgModule({
  providers: [ authInterceptorProvider ],
})
export class CoreModule { }
