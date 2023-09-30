import { Component, Input } from '@angular/core';

import { Ingredient } from '../models';

@Component({
  selector: 'shopping-list',
  templateUrl: './shoppingList.component.html',
  styleUrls: ['./shoppingList.component.scss']
})
export class ShoppingList {
  @Input({ required: true }) ingredients!: Ingredient[];
}
