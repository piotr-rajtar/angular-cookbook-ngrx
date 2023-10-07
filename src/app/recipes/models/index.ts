import { Ingredient } from '../../shopping/models';

export interface Recipe {
  name: string;
  description: string;
  imagePath: string;
  ingredients: Ingredient[];
}
