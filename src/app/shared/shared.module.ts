import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClickOutsideDirective } from './directives/clickOutside.directive';
import { DropdownDirective } from './directives/dropdown.directive';
import { PlaceholderDirective } from './directives/placeholder.directive';

import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    //COMPONENTS
    AlertComponent,
    //DIRECTIVES
    ClickOutsideDirective,
    DropdownDirective,
    PlaceholderDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    //COMPONENTS
    AlertComponent,
    //DIRECTIVES
    ClickOutsideDirective,
    DropdownDirective,
    PlaceholderDirective,
    //MODULES
    CommonModule,
  ],
})
export class SharedModule { }
