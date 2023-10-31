import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ingredient } from '../../models/ingredient';
import { ShoppingService } from '../../services/shopping.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingList {
  @Input({ required: true }) ingredients!: Ingredient[];

  constructor(private shoppingService: ShoppingService) {}

  onIngredientClick(ingredientId: string): void {
    this.shoppingService.editShoppingList.next(ingredientId);
  }
}
