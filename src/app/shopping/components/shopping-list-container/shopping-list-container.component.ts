import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../models/ingredient';
import { ShoppingService } from '../../services/shopping.service';

import { ShoppingList } from '../shopping-list/shopping-list.component';
import { ShoppingListEdit } from '../shopping-list-edit/shopping-list-edit.component';

@Component({
  standalone: true,
  imports: [CommonModule, ShoppingList, ShoppingListEdit],
  selector: 'shopping-container',
  templateUrl: './shopping-list-container.component.html',
  styleUrls: ['./shopping-list-container.component.scss']
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
