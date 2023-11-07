import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

import { AppState } from '../../../store/types';

import { selectRecipes } from '../../store/recipes.selectors';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-recipe-no-selection',
  templateUrl: './recipe-no-selection.component.html',
  styleUrls: ['./recipe-no-selection.component.scss']
})
export class RecipeNoSelectionComponent {
  constructor(private store: Store<AppState>) {}

  get title(): Observable<string> {
    return this.store.select(selectRecipes)
      .pipe(
        map(recipes => {
          return recipes.length
            ? 'Please select a receipe!'
            : 'Please add a recipe!';
        }),
      );
  }
}
