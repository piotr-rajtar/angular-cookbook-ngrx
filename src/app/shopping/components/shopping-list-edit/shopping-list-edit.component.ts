import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Store } from '@ngrx/store';
import { EMPTY, Subscription, switchMap } from 'rxjs';

import { AppState } from '../../../store/types';

import { Ingredient } from '../../models/ingredient';
import { IngredientData } from '../../models';
import { shoppingListActions } from '../../store/shopping-list.actions';
import {
  selectShoppingListEditItemId,
  selectShoppingListIngredient,
} from '../../store/shopping-list.selectors';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEdit implements OnDestroy, OnInit {
  ingredientAmount: number | null = null;
  ingredientName: string = '';
  editShoppingListSubscription!: Subscription;
  isInEditMode: boolean = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.editShoppingListSubscription = this.store.select(selectShoppingListEditItemId)
      .pipe(
        switchMap(editItemId => {
          if(editItemId) {
            this.isInEditMode = true;
            return this.store.select(selectShoppingListIngredient(editItemId))
          }
          return EMPTY;
        })
      )
      .subscribe(ingredient => {
        if(!ingredient) {
          return;
        }
        this.ingredientAmount = ingredient.amount;
        this.ingredientName = ingredient.name;
      });
  }

  ngOnDestroy(): void {
    this.editShoppingListSubscription.unsubscribe();
    this.store.dispatch(shoppingListActions.stopEdit());
  }

  get addButtonTitle(): string {
    return this.isInEditMode ? 'Update' : 'Add';
  }

  getIngredientAmountErrorMessage(ingredientAmountField: NgModel): string {
    const errors = {
      max: 'Given amount is too big. Max amount is 100!',
      min: 'Given amount is too small. Min amount is 1!',
      required: 'Field is required!',
    }

    return errors[Object.keys(ingredientAmountField.errors!)[0] as keyof typeof errors];
  }

  onSubmit(shoppingListForm: NgForm): void {
    if(this.isInEditMode) {
      this.updateIngredient(shoppingListForm);
      return;
    }
    this.addIngredient(shoppingListForm);
  }

  addIngredient(shoppingListForm: NgForm): void {
    const ingredient = new Ingredient(
      shoppingListForm.value.ingredientName,
      shoppingListForm.value.ingredientAmount,
    );

    this.store.dispatch(shoppingListActions.addIngredient({ ingredient }));

    this.clearIngredient(shoppingListForm);
  }

  updateIngredient(shoppingListForm: NgForm): void {
    const ingredientDataToEdit: IngredientData = {
      amount: shoppingListForm.value.ingredientAmount,
      name: shoppingListForm.value.ingredientName,
    };

    this.store.dispatch(shoppingListActions.updateIngredient({ ingredientDataToEdit }));

    this.clearIngredient(shoppingListForm);
  }

  clearEditMode(): void {
    this.isInEditMode = false;
    this.store.dispatch(shoppingListActions.stopEdit());
  }

  clearIngredient(shoppingListForm: NgForm): void {
    shoppingListForm.reset();

    if(this.isInEditMode) {
      this.clearEditMode();
    }
  }

  deleteIngredient(shoppingListForm: NgForm): void {
    this.store.dispatch(shoppingListActions.deleteIngredient());

    this.clearIngredient(shoppingListForm);
  }
}
