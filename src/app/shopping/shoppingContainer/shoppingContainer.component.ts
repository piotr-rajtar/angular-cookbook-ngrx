import { Component } from '@angular/core';

import { Ingredient } from '../models';

@Component({
  selector: 'shopping-container',
  templateUrl: './shoppingContainer.component.html',
  styleUrls: ['./shoppingContainer.component.scss']
})
export class ShoppingContainer {
  ingredients: Ingredient[] = [];

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
