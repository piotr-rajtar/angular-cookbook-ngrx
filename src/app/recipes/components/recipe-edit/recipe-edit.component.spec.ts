import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeEditComponent } from './recipeEdit.component';

describe('RecipeAddComponent', () => {
  let component: RecipeEditComponent;
  let fixture: ComponentFixture<RecipeEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeEditComponent]
    });
    fixture = TestBed.createComponent(RecipeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
