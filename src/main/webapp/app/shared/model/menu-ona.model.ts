import { IFormulaOna } from 'app/shared/model/formula-ona.model';
import { IMenuCategoryOna } from 'app/shared/model/menu-category-ona.model';

export interface IMenuOna {
  id?: number;
  tittle?: string;
  listFormules?: IFormulaOna[];
  listCategories?: IMenuCategoryOna[];
  restaurantId?: number;
}

export class MenuOna implements IMenuOna {
  constructor(
    public id?: number,
    public tittle?: string,
    public listFormules?: IFormulaOna[],
    public listCategories?: IMenuCategoryOna[],
    public restaurantId?: number
  ) {}
}
