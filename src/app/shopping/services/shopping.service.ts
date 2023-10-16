import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  private ingredients: Ingredient[] = [];

  updateShoppingList = new Subject<void>();

  getIngredients(): Ingredient[] {
    return structuredClone(this.ingredients);
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.updateShoppingList.next();
  }

  addIngredientList(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.updateShoppingList.next();
  }
}
