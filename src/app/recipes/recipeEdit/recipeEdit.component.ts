import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipeEdit.component.html',
  styleUrls: ['./recipeEdit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id?: string;

  get editMode(): boolean {
    return !!this.id;
  }

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    })
  }
}
