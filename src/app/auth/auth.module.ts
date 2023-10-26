import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { AuthComponent } from './components/auth.component';
import { AuthRoutingModule } from './router/auth-routing.module';

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    AuthRoutingModule,
    FormsModule,
    SharedModule,
  ],
})
export class AuthModule { }
