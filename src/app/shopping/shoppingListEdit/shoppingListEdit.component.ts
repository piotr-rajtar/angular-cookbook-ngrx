import { Component } from '@angular/core';

import { Ingredient } from '../models/index';
import { ShoppingService } from '../services/shopping.service';

@Component({
  selector: 'shopping-list-edit',
  templateUrl: './shoppingListEdit.component.html',
  styleUrls: ['./shoppingListEdit.component.scss']
})
export class ShoppingListEdit {
  ingredientName: string = '';
  ingredientAmount: number | null = null;

  constructor(private shoppingService: ShoppingService) {}

  get isAddButtonDisabled(): boolean {
    return !this.ingredientName || !this.ingredientAmount;
  }

  addIngredient(): void {
    const ingredient: Ingredient = {
      name: this.ingredientName,
      amount: this.ingredientAmount as number,
    };
    this.shoppingService.addIngredient(ingredient);

    this.clearIngredient();
  }

  clearIngredient(): void {
    this.ingredientName = '';
    this.ingredientAmount = null;
  }

  deleteIngredient() {
    console.log('delete ingredient')
  }
}
