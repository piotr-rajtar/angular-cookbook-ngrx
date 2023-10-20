import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from '../models/recipe';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipeList.component.html',
  styleUrls: ['./recipeList.component.scss']
})
export class RecipeList {
  @Input({ required: true }) recipes!: Recipe[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  onAddClick(): void {
    this.router.navigate(['add'], { relativeTo: this.route });
  }
}
