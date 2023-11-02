import { ShoppingListState } from '../../shopping/store/shopping-list.reducer';

export enum AlertType {
  DANGER,
  SUCCESS,
}

//TU JAKO KLUCZ MUSI BYĆ NAZWA PODANA W NAME W PROVIDE STATE W PLIKU MAIN.TS
//JAKO TYP MUSI BYĆ TYP DLA INITIAL STATE'A PODANEGO W REDEUCERZE
//ZADEKLAROWANYM JAKO REDUCER W PLIKU MAIN.TS DLA ZADANEGO KLUCZA
export interface AppState {
  shoppingList: ShoppingListState
}
