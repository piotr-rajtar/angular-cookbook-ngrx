import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../../../shared/models';

import { Ingredient } from '../../models/ingredient';
import { selectShoppingListIngredients } from '../../store/shopping-list.selectors';

import { ShoppingList } from '../shopping-list/shopping-list.component';
import { ShoppingListEdit } from '../shopping-list-edit/shopping-list-edit.component';

@Component({
  standalone: true,
  imports: [CommonModule, ShoppingList, ShoppingListEdit],
  selector: 'shopping-container',
  templateUrl: './shopping-list-container.component.html',
  styleUrls: ['./shopping-list-container.component.scss']
})
export class ShoppingListContainer implements OnInit {
  ingredients!: Observable<Ingredient[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    //TO ZWRACA OBSERVABLA, MOZNA TO OGRAĆ PIPEM ASYNC LUB SUBSCRIBEM
    this.ingredients = this.store.select(selectShoppingListIngredients);
  }
}
