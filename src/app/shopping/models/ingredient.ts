export class Ingredient {
  id: number;

  constructor(
    public name: string,
    public amount: number
  ) {
    this.id = new Date().getTime();
  }
}
