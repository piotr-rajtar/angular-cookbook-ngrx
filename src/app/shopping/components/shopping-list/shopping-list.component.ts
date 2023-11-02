import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import { AppState } from '../../../store/types';

import { Ingredient } from '../../models/ingredient';
import { shoppingListActions } from '../../store/shopping-list.actions';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingList {
  @Input({ required: true }) ingredients!: Ingredient[];

  constructor(private store: Store<AppState>) {}

  onIngredientClick(ingredientId: string): void {
    this.store.dispatch(shoppingListActions.startEdit({ ingredientId }));
  }
}
