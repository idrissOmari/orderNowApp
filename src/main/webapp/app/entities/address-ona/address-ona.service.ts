import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAddressOna } from 'app/shared/model/address-ona.model';

type EntityResponseType = HttpResponse<IAddressOna>;
type EntityArrayResponseType = HttpResponse<IAddressOna[]>;

@Injectable({ providedIn: 'root' })
export class AddressOnaService {
  public resourceUrl = SERVER_API_URL + 'api/addresses';

  constructor(protected http: HttpClient) {}

  create(address: IAddressOna): Observable<EntityResponseType> {
    return this.http.post<IAddressOna>(this.resourceUrl, address, { observe: 'response' });
  }

  update(address: IAddressOna): Observable<EntityResponseType> {
    return this.http.put<IAddressOna>(this.resourceUrl, address, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAddressOna>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAddressOna[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
