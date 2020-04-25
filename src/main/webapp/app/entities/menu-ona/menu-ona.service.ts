import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMenuOna } from 'app/shared/model/menu-ona.model';

type EntityResponseType = HttpResponse<IMenuOna>;
type EntityArrayResponseType = HttpResponse<IMenuOna[]>;

@Injectable({ providedIn: 'root' })
export class MenuOnaService {
  public resourceUrl = SERVER_API_URL + 'api/menus';

  constructor(protected http: HttpClient) {}

  create(menu: IMenuOna): Observable<EntityResponseType> {
    return this.http.post<IMenuOna>(this.resourceUrl, menu, { observe: 'response' });
  }

  update(menu: IMenuOna): Observable<EntityResponseType> {
    return this.http.put<IMenuOna>(this.resourceUrl, menu, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMenuOna>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMenuOna[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
