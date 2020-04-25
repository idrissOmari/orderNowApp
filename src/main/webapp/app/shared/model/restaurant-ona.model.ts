import { IRestaurantTableOna } from 'app/shared/model/restaurant-table-ona.model';
import { IMenuOna } from 'app/shared/model/menu-ona.model';

export interface IRestaurantOna {
  id?: number;
  nom?: string;
  tel?: string;
  email?: string;
  description?: string;
  addressId?: number;
  listTables?: IRestaurantTableOna[];
  listMenus?: IMenuOna[];
}

export class RestaurantOna implements IRestaurantOna {
  constructor(
    public id?: number,
    public nom?: string,
    public tel?: string,
    public email?: string,
    public description?: string,
    public addressId?: number,
    public listTables?: IRestaurantTableOna[],
    public listMenus?: IMenuOna[]
  ) {}
}
