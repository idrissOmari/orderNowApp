import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMenuCategoryOna } from 'app/shared/model/menu-category-ona.model';

type EntityResponseType = HttpResponse<IMenuCategoryOna>;
type EntityArrayResponseType = HttpResponse<IMenuCategoryOna[]>;

@Injectable({ providedIn: 'root' })
export class MenuCategoryOnaService {
  public resourceUrl = SERVER_API_URL + 'api/menu-categories';

  constructor(protected http: HttpClient) {}

  create(menuCategory: IMenuCategoryOna): Observable<EntityResponseType> {
    return this.http.post<IMenuCategoryOna>(this.resourceUrl, menuCategory, { observe: 'response' });
  }

  update(menuCategory: IMenuCategoryOna): Observable<EntityResponseType> {
    return this.http.put<IMenuCategoryOna>(this.resourceUrl, menuCategory, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMenuCategoryOna>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMenuCategoryOna[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
