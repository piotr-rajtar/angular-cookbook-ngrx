import { AuthState } from '../auth/store/auth.reducer';
import { ShoppingListState } from '../shopping/store/shopping-list.reducer';

//TU JAKO KLUCZ MUSI BYĆ NAZWA PODANA W NAME W PROVIDE STATE W PLIKU MAIN.TS
//JAKO TYP MUSI BYĆ TYP DLA INITIAL STATE'A PODANEGO W REDEUCERZE
//ZADEKLAROWANYM JAKO REDUCER W PLIKU MAIN.TS DLA ZADANEGO KLUCZA
export interface AppState {
  auth: AuthState;
  shoppingList: ShoppingListState;
}
