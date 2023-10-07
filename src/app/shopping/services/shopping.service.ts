import { EventEmitter, Injectable } from '@angular/core';

import { Ingredient } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  private ingredients: Ingredient[] = [];

  updateShoppingList = new EventEmitter();

  getIngredients(): Ingredient[] {
    return structuredClone(this.ingredients);
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.updateShoppingList.emit();
  }
}
