import { IProductOna } from 'app/shared/model/product-ona.model';

export interface IFormulaOrderOna {
  id?: number;
  quantity?: number;
  listProducts?: IProductOna[];
  orderId?: number;
}

export class FormulaOrderOna implements IFormulaOrderOna {
  constructor(public id?: number, public quantity?: number, public listProducts?: IProductOna[], public orderId?: number) {}
}
