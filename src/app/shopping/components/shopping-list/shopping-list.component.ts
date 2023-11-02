import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import { AppState } from '../../../shared/models';

import { Ingredient } from '../../models/ingredient';
import * as ShoppingListActions from '../../store/shopping-list.actions';

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
    this.store.dispatch(ShoppingListActions.startEdit({ ingredientId }));
  }
}
