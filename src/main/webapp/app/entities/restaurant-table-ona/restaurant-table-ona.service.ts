import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRestaurantTableOna } from 'app/shared/model/restaurant-table-ona.model';

type EntityResponseType = HttpResponse<IRestaurantTableOna>;
type EntityArrayResponseType = HttpResponse<IRestaurantTableOna[]>;

@Injectable({ providedIn: 'root' })
export class RestaurantTableOnaService {
  public resourceUrl = SERVER_API_URL + 'api/restaurant-tables';

  constructor(protected http: HttpClient) {}

  create(restaurantTable: IRestaurantTableOna): Observable<EntityResponseType> {
    return this.http.post<IRestaurantTableOna>(this.resourceUrl, restaurantTable, { observe: 'response' });
  }

  update(restaurantTable: IRestaurantTableOna): Observable<EntityResponseType> {
    return this.http.put<IRestaurantTableOna>(this.resourceUrl, restaurantTable, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRestaurantTableOna>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRestaurantTableOna[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
