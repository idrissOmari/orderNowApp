export interface IAddressOna {
  id?: number;
  adresse1?: string;
  adresse2?: string;
  postalCode?: number;
  city?: string;
  country?: string;
}

export class AddressOna implements IAddressOna {
  constructor(
    public id?: number,
    public adresse1?: string,
    public adresse2?: string,
    public postalCode?: number,
    public city?: string,
    public country?: string
  ) {}
}
