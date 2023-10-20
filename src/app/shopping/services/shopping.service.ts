import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../models/ingredient';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  private ingredients: Ingredient[] = [];

  editShoppingList = new Subject<number>();
  updateShoppingList = new Subject<void>();

  getIngredient(ingredientId: number): Ingredient {
    return this.ingredients.find(
      ingredient => ingredient.id === ingredientId
    ) as Ingredient;
  }

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

  deleteIngredient(ingredientId: number): void {
    const filteredIngredientArray = this.ingredients.filter(
      ingredient => ingredient.id !== ingredientId
    );
    this.ingredients = filteredIngredientArray;
    this.updateShoppingList.next();
  }

  updateIngredient(updatedIngredient: Ingredient): void {
    const ingredientToUpdate = this.ingredients.find(
      ingredient => ingredient.id === updatedIngredient.id
    ) as Ingredient;
    const ingredientToUpdateIndex = this.ingredients.indexOf(ingredientToUpdate);
    this.ingredients.splice(ingredientToUpdateIndex, 1, updatedIngredient);
    this.updateShoppingList.next();
  }
}
