import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../models/ingredient';
import { ShoppingService } from '../../services/shopping.service';

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
  editedIngredientId?: string;
  isInEditMode: boolean = false;

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.editShoppingListSubscription = this.shoppingService.editShoppingList.subscribe(
      editItemId => {
        this.isInEditMode = true;
        this.editedIngredientId = editItemId;

        const ingredientToEdit = this.shoppingService.getIngredient(editItemId);

        this.ingredientAmount = ingredientToEdit.amount;
        this.ingredientName = ingredientToEdit.name;
      }
    )
  }

  ngOnDestroy(): void {
    this.editShoppingListSubscription.unsubscribe();
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

    this.shoppingService.addIngredient(ingredient);

    this.clearIngredient(shoppingListForm);
  }

  updateIngredient(shoppingListForm: NgForm): void {
    const ingredient: Ingredient = {
      id: this.editedIngredientId as string,
      amount: shoppingListForm.value.ingredientAmount,
      name: shoppingListForm.value.ingredientName,
    };

    this.shoppingService.updateIngredient(ingredient);

    this.clearIngredient(shoppingListForm);
  }

  clearEditMode(): void {
    this.editedIngredientId = undefined;
    this.isInEditMode = false;
  }

  clearIngredient(shoppingListForm: NgForm): void {
    shoppingListForm.reset();

    if(this.isInEditMode) {
      this.clearEditMode();
    }
  }

  deleteIngredient(shoppingListForm: NgForm): void {
    this.shoppingService.deleteIngredient(this.editedIngredientId as string);

    this.clearIngredient(shoppingListForm);
  }
}
