import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRestaurantOna } from 'app/shared/model/restaurant-ona.model';

type EntityResponseType = HttpResponse<IRestaurantOna>;
type EntityArrayResponseType = HttpResponse<IRestaurantOna[]>;

@Injectable({ providedIn: 'root' })
export class RestaurantOnaService {
  public resourceUrl = SERVER_API_URL + 'api/restaurants';

  constructor(protected http: HttpClient) {}

  create(restaurant: IRestaurantOna): Observable<EntityResponseType> {
    return this.http.post<IRestaurantOna>(this.resourceUrl, restaurant, { observe: 'response' });
  }

  update(restaurant: IRestaurantOna): Observable<EntityResponseType> {
    return this.http.put<IRestaurantOna>(this.resourceUrl, restaurant, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRestaurantOna>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRestaurantOna[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
