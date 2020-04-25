export interface IProductOrderOna {
  id?: number;
  quantity?: number;
  productId?: number;
  orderId?: number;
}

export class ProductOrderOna implements IProductOrderOna {
  constructor(public id?: number, public quantity?: number, public productId?: number, public orderId?: number) {}
}
