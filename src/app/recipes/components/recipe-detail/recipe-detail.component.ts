import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ClickOutsideDirective } from '../../../shared/directives/clickOutside.directive';
import { DropdownDirective } from '../../../shared/directives/dropdown.directive';

import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe.service';

@Component({
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective, DropdownDirective],
  selector: 'recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetail implements OnInit {
  recipe?: Recipe;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipe = this.recipeService.getRecipe(params['id']);
    });
  }

  isDropdownOpen = false;

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  addToShoppingList(): void {
    this.recipeService.addIngredientsToShoppingList((this.recipe as Recipe).ingredients);
    this.closeDropdown();
  }

  editRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  deleteRecipe(): void {
    this.recipeService.deleteRecipe(this.recipe?.id as string);

    this.router.navigate(['/recipes']);
  }
}
