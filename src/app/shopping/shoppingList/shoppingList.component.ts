import { Component } from '@angular/core';

import { Ingredient } from '../models';

@Component({
  selector: 'shopping-list',
  templateUrl: './shoppingList.component.html',
  styleUrls: ['./shoppingList.component.scss']
})
export class ShoppingList {
  ingredients: Ingredient[] = [
    {
      name: 'Apples',
      amount: 5,
    },
    {
      name: 'Tomatoes',
      amount: 10,
    },
  ];
}
