import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../models';
import { ShoppingService } from '../services/shopping.service';

@Component({
  selector: 'shopping-container',
  templateUrl: './shoppingListContainer.component.html',
  styleUrls: ['./shoppingListContainer.component.scss']
})
export class ShoppingListContainer implements OnDestroy, OnInit {
  ingredients: Ingredient[] = [];
  updateShoppingListSubscription!: Subscription;

  constructor(private shoppingService: ShoppingService) {
    this.updateShoppingListSubscription = this.shoppingService.updateShoppingList.subscribe(() => {
      this.getIngredients();
    })
  }

  ngOnInit(): void {
    this.getIngredients();
  }

  ngOnDestroy(): void {
    this.updateShoppingListSubscription.unsubscribe();
  }

  getIngredients(): void {
    this.ingredients = this.shoppingService.getIngredients();
  }
}
