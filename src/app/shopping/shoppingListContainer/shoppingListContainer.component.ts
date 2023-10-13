import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../models';
import { ShoppingService } from '../services/shopping.service';

@Component({
  selector: 'shopping-container',
  templateUrl: './shoppingListContainer.component.html',
  styleUrls: ['./shoppingListContainer.component.scss']
})
export class ShoppingListContainer implements OnInit {
  ingredients: Ingredient[] = [];

  constructor(private shoppingService: ShoppingService) {
    this.shoppingService.updateShoppingList.subscribe(() => {
      this.getIngredients();
    })
  }

  ngOnInit(): void {
    this.getIngredients();
  }

  getIngredients(): void {
    this.ingredients = this.shoppingService.getIngredients();
  }
}
