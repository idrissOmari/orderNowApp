import { IProductOna } from 'app/shared/model/product-ona.model';

export interface IFormulaOna {
  id?: number;
  label?: string;
  price?: number;
  listProducts?: IProductOna[];
  menuId?: number;
}

export class FormulaOna implements IFormulaOna {
  constructor(
    public id?: number,
    public label?: string,
    public price?: number,
    public listProducts?: IProductOna[],
    public menuId?: number
  ) {}
}
