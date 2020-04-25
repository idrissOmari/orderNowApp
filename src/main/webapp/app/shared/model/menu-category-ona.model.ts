import { IProductOna } from 'app/shared/model/product-ona.model';

export interface IMenuCategoryOna {
  id?: number;
  label?: string;
  listProducts?: IProductOna[];
  menuId?: number;
}

export class MenuCategoryOna implements IMenuCategoryOna {
  constructor(public id?: number, public label?: string, public listProducts?: IProductOna[], public menuId?: number) {}
}
