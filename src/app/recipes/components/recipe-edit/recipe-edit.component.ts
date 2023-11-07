import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../../shopping/models/ingredient';
import { AppState } from '../../../store/types';

import { Recipe } from '../../models/recipe';
import { selectRecipe } from '../../store/recipes.selectors';
import { recipesActions } from '../../store/recipes.actions';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnDestroy, OnInit {
  id?: string;
  recipeForm!: FormGroup;
  storeSubscription?: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.initForm();
    });
  }

  get isInEditMode(): boolean {
    return !!this.id;
  }

  get ingredientsControls(): AbstractControl[] {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  get imageUrl(): string {
    return this.recipeForm.get('recipeImageUrl')?.value;
  }

  get hasRecipeNameFieldError(): boolean {
    return !this.recipeForm.get('recipeName')?.valid &&
      !!this.recipeForm.get('recipeName')?.touched;
  }

  get hasRecipeImageUrlFieldError(): boolean {
    return !this.recipeForm.get('recipeImageUrl')?.valid &&
      !!this.recipeForm.get('recipeImageUrl')?.touched;
  }

  get hasRecipeDescriptionFieldError(): boolean {
    return !this.recipeForm.get('recipeDescription')?.valid &&
      !!this.recipeForm.get('recipeDescription')?.touched;
  }

  hasIngredientNameError(index: number): boolean {
    const ingredientGroup: FormGroup = (
      this.recipeForm.get('ingredients') as FormArray<FormGroup>
    ).at(index);

    return !ingredientGroup.get('ingredientName')?.valid &&
    !!ingredientGroup.get('ingredientName')?.touched;
  }

  hasIngredientAmountError(index: number): boolean {
    const ingredientGroup: FormGroup = (
      this.recipeForm.get('ingredients') as FormArray<FormGroup>
    ).at(index);

    return !ingredientGroup.get('ingredientAmount')?.valid &&
    !!ingredientGroup.get('ingredientAmount')?.touched;
  }

  getIngredientAmountErrorMessage(index: number): string {
    const errors = {
      max: 'Given amount is too big. Max amount is 100!',
      min: 'Given amount is too small. Min amount is 1!',
      required: 'Field is required!',
    }

    const ingredientGroup: FormGroup = (
      this.recipeForm.get('ingredients') as FormArray<FormGroup>
    ).at(index);

    const ingredientAmountFieldErrors =
      ingredientGroup.get('ingredientAmount')?.errors as ValidationErrors;

    return errors[Object.keys(ingredientAmountFieldErrors)[0] as keyof typeof errors];
  }

  initForm(): void {
    if(this.isInEditMode) {
      this.initPreFilledForm();
    } else{
      this.initEmptyForm();
    }
  }

  initEmptyForm(): void {
    this.recipeForm = this.formBuilder.group({
      recipeName: ['', Validators.required],
      recipeImageUrl: ['', Validators.required],
      recipeDescription: ['', Validators.required],
      ingredients: this.formBuilder.array<FormGroup>([]),
    });
  }

  initPreFilledForm(): void {
    this.storeSubscription = this.store.select(selectRecipe(this.id as string))
      .subscribe(recipe => {
        const ingredients: FormGroup[] = recipe?.ingredients.map(ingredient => {
          return this.formBuilder.group({
            ingredientName: [ingredient.name, Validators.required],
            ingredientAmount: [
              ingredient.amount,
              [
                Validators.required,
                Validators.min(1),
                Validators.max(100)
              ]
            ],
          });
        }) || [];

        this.recipeForm = this.formBuilder.group({
          recipeName: [recipe?.name, Validators.required],
          recipeImageUrl: [recipe?.imagePath, Validators.required],
          recipeDescription: [recipe?.description, Validators.required],
          ingredients: this.formBuilder.array<FormGroup>(ingredients),
        });
      });
  }

  addIngredient(): void {
    const newIngredientForm = this.formBuilder.group({
      ingredientName: ['', Validators.required],
      ingredientAmount: [
        null,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(100)
        ]
      ],
    });

    (this.recipeForm.get('ingredients') as FormArray<FormGroup>).push(newIngredientForm);
  }

  removeIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray<FormGroup>).removeAt(index);
  }

  onSubmit() {
    const formattedIngredients: Ingredient[] = (
      this.recipeForm.value['ingredients'] as {
        ingredientAmount: number;
        ingredientName: string
      }[]
    ).map(ingredient => {
        return new Ingredient(
          ingredient.ingredientName,
          ingredient.ingredientAmount,
        )
      }
    );

    if(this.isInEditMode) {
      const updatedRecipe: Recipe = {
        id: this.id as string,
        name: this.recipeForm.value.recipeName,
        description: this.recipeForm.value.recipeDescription,
        imagePath: this.recipeForm.value.recipeImageUrl,
        ingredients: formattedIngredients,
      }

      this.store.dispatch(recipesActions.updateRecipe({ updatedRecipe }));
    } else {
      const newRecipe = new Recipe(
        this.recipeForm.value.recipeName,
        this.recipeForm.value.recipeDescription,
        this.recipeForm.value.recipeImageUrl,
        formattedIngredients,
      )

      this.store.dispatch(recipesActions.addRecipe({ newRecipe }));
    }

    this.recipeForm.reset();
    (this.recipeForm.get('ingredients') as FormArray<FormGroup>).clear();
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    if(this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }
}
