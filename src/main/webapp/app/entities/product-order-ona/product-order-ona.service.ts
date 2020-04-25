import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProductOrderOna } from 'app/shared/model/product-order-ona.model';

type EntityResponseType = HttpResponse<IProductOrderOna>;
type EntityArrayResponseType = HttpResponse<IProductOrderOna[]>;

@Injectable({ providedIn: 'root' })
export class ProductOrderOnaService {
  public resourceUrl = SERVER_API_URL + 'api/product-orders';

  constructor(protected http: HttpClient) {}

  create(productOrder: IProductOrderOna): Observable<EntityResponseType> {
    return this.http.post<IProductOrderOna>(this.resourceUrl, productOrder, { observe: 'response' });
  }

  update(productOrder: IProductOrderOna): Observable<EntityResponseType> {
    return this.http.put<IProductOrderOna>(this.resourceUrl, productOrder, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProductOrderOna>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProductOrderOna[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
