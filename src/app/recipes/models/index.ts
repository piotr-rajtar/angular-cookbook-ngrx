import { Ingredient } from '../../shopping/models';

export interface Recipe {
  id: string,
  name: string;
  description: string;
  imagePath: string;
  ingredients: Ingredient[];
}
