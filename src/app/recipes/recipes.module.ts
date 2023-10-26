import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DirectivesModule } from '../directives/directives.module';

import { RecipeContainer } from './components/recipeContainer/recipeContainer.component';
import { RecipeDetail } from './components/recipeDetail/recipeDetail.component';
import { RecipeEditComponent } from './components/recipeEdit/recipeEdit.component';
import { RecipeItem } from './components/recipeItem/recipeItem.component';
import { RecipeList } from './components/recipeList/recipeList.component';
import { RecipeNoSelectionComponent } from './components/recipeNoSelection/recipeNoSelection.component';

import { RecipesRoutingModule } from './router/recipes-routing.module';

@NgModule({
  declarations: [
    RecipeContainer,
    RecipeDetail,
    RecipeEditComponent,
    RecipeItem,
    RecipeList,
    RecipeNoSelectionComponent,
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
  ],
})
export class RecipesModule { }
