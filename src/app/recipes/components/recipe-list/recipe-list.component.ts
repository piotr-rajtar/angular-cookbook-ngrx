import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from '../../models/recipe';

import { RecipeItem } from '../recipe-item/recipe-item.component';

@Component({
  standalone: true,
  imports: [CommonModule, RecipeItem],
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
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
