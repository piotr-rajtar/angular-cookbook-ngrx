import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../models';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'recipe-detail',
  templateUrl: './recipeDetail.component.html',
  styleUrls: ['./recipeDetail.component.scss']
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

  onEditClick() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
