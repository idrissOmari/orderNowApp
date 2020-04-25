import { Moment } from 'moment';
import { IProductOrderOna } from 'app/shared/model/product-order-ona.model';
import { IFormulaOrderOna } from 'app/shared/model/formula-order-ona.model';
import { IRestaurantTableOna } from 'app/shared/model/restaurant-table-ona.model';
import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';

export interface IOrderOna {
  id?: number;
  totalPrice?: number;
  status?: OrderStatus;
  createDate?: Moment;
  updateDate?: Moment;
  listProductOrders?: IProductOrderOna[];
  listFormulaOrders?: IFormulaOrderOna[];
  listTables?: IRestaurantTableOna[];
}

export class OrderOna implements IOrderOna {
  constructor(
    public id?: number,
    public totalPrice?: number,
    public status?: OrderStatus,
    public createDate?: Moment,
    public updateDate?: Moment,
    public listProductOrders?: IProductOrderOna[],
    public listFormulaOrders?: IFormulaOrderOna[],
    public listTables?: IRestaurantTableOna[]
  ) {}
}
