import { Component, Input } from '@angular/core';

import { Ingredient } from '../../models/ingredient';
import { ShoppingService } from '../../services/shopping.service';

@Component({
  selector: 'shopping-list',
  templateUrl: './shoppingList.component.html',
  styleUrls: ['./shoppingList.component.scss'],
})
export class ShoppingList {
  @Input({ required: true }) ingredients!: Ingredient[];

  constructor(private shoppingService: ShoppingService) {}

  onIngredientClick(ingredientId: string): void {
    this.shoppingService.editShoppingList.next(ingredientId);
  }
}
