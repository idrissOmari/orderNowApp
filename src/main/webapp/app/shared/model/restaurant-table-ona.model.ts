import { TableStatus } from 'app/shared/model/enumerations/table-status.model';

export interface IRestaurantTableOna {
  id?: number;
  tNumber?: number;
  tStatus?: TableStatus;
  restaurantId?: number;
  orderId?: number;
}

export class RestaurantTableOna implements IRestaurantTableOna {
  constructor(
    public id?: number,
    public tNumber?: number,
    public tStatus?: TableStatus,
    public restaurantId?: number,
    public orderId?: number
  ) {}
}
