import { v4 } from 'uuid';

export class Ingredient {
  id: string;

  constructor(
    public name: string,
    public amount: number
  ) {
    this.id = v4();
  }
}
