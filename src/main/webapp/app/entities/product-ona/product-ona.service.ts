import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProductOna } from 'app/shared/model/product-ona.model';

type EntityResponseType = HttpResponse<IProductOna>;
type EntityArrayResponseType = HttpResponse<IProductOna[]>;

@Injectable({ providedIn: 'root' })
export class ProductOnaService {
  public resourceUrl = SERVER_API_URL + 'api/products';

  constructor(protected http: HttpClient) {}

  create(product: IProductOna): Observable<EntityResponseType> {
    return this.http.post<IProductOna>(this.resourceUrl, product, { observe: 'response' });
  }

  update(product: IProductOna): Observable<EntityResponseType> {
    return this.http.put<IProductOna>(this.resourceUrl, product, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProductOna>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProductOna[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
