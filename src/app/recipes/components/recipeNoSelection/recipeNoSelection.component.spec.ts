import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeNoSelectionComponent } from './recipeNoSelection.component';

describe('RecipeNoSelectionComponent', () => {
  let component: RecipeNoSelectionComponent;
  let fixture: ComponentFixture<RecipeNoSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeNoSelectionComponent]
    });
    fixture = TestBed.createComponent(RecipeNoSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
