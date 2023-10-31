import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Recipe } from '../../models/recipe';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItem {
  @Input({ required: true }) recipe!: Recipe;
}
