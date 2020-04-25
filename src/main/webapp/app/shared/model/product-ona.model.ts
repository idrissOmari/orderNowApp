import { IFormulaOrderOna } from 'app/shared/model/formula-order-ona.model';

export interface IProductOna {
  id?: number;
  name?: string;
  price?: number;
  menuCategoryId?: number;
  formulaId?: number;
  listFormulas?: IFormulaOrderOna[];
}

export class ProductOna implements IProductOna {
  constructor(
    public id?: number,
    public name?: string,
    public price?: number,
    public menuCategoryId?: number,
    public formulaId?: number,
    public listFormulas?: IFormulaOrderOna[]
  ) {}
}
