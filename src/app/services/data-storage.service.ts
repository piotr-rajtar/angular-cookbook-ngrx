import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

import { Recipe } from '../recipes/models/recipe';
import { RecipeService } from '../recipes/services/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
  ) { }

  fetchRecipes(): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>(
      'https://angular-cook-book-35d2a-default-rtdb.firebaseio.com/recipes.json'
    )
    .pipe(
      map(recipes => {
        return (recipes || []).map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients || [],
          }
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      }),
    );
  }

  storeRecipes(): Observable<Recipe[]> {
    const recipes = this.recipeService.getRecipes() ;
    //POST DODA CAŁA TABLICĘ JAKO POJEDYNCZY REKORD

    //PUT NADPISUJE ZAPISANE REKORDY TYMI WYSYŁANYMI
    //I KAZDY ELEMENT Z TABLICY ZAPISUJE OSOBNO DO KOLEKCJI
    return this.httpClient.put<Recipe[]>(
      'https://angular-cook-book-35d2a-default-rtdb.firebaseio.com/recipes.json',
      recipes
    );
  }
}
