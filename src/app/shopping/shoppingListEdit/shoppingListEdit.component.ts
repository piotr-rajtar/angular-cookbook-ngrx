import { Component, EventEmitter, Output } from '@angular/core';

import { Ingredient } from '../models/index';

@Component({
  selector: 'shopping-list-edit',
  templateUrl: './shoppingListEdit.component.html',
  styleUrls: ['./shoppingListEdit.component.scss']
})
export class ShoppingListEdit {
  @Output() ingredientAddition = new EventEmitter<Ingredient>();

  ingredientName: string = '';
  ingredientAmount: number | null = null;

  get isAddButtonDisabled(): boolean {
    return !this.ingredientName || !this.ingredientAmount;
  }

  addIngredient(): void {
    this.ingredientAddition.emit({
      name: this.ingredientName,
      amount: this.ingredientAmount as number,
    })

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
