import { NgModule } from '@angular/core';

import { ClickOutsideDirective } from './clickOutside.directive';
import { DropdownDirective } from './dropdown.directive';
import { PlaceholderDirective } from './placeholder.directive';

@NgModule({
  declarations: [
    ClickOutsideDirective,
    DropdownDirective,
    PlaceholderDirective,
  ],
  exports: [
    ClickOutsideDirective,
    DropdownDirective,
    PlaceholderDirective,
  ],
})
export class DirectivesModule { }
