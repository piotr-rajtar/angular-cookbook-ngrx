import { v4 } from 'uuid';

import { Ingredient } from '../../shopping/models/ingredient';

export class Recipe {
  id: string;

  constructor(
    public name: string,
    public description: string,
    public imagePath: string,
    public ingredients: Ingredient[],
  ) {
    this.id = v4();
  }
}
