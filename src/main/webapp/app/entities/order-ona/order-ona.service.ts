import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IOrderOna } from 'app/shared/model/order-ona.model';

type EntityResponseType = HttpResponse<IOrderOna>;
type EntityArrayResponseType = HttpResponse<IOrderOna[]>;

@Injectable({ providedIn: 'root' })
export class OrderOnaService {
  public resourceUrl = SERVER_API_URL + 'api/orders';

  constructor(protected http: HttpClient) {}

  create(order: IOrderOna): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(order);
    return this.http
      .post<IOrderOna>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(order: IOrderOna): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(order);
    return this.http
      .put<IOrderOna>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IOrderOna>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IOrderOna[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(order: IOrderOna): IOrderOna {
    const copy: IOrderOna = Object.assign({}, order, {
      createDate: order.createDate && order.createDate.isValid() ? order.createDate.toJSON() : undefined,
      updateDate: order.updateDate && order.updateDate.isValid() ? order.updateDate.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createDate = res.body.createDate ? moment(res.body.createDate) : undefined;
      res.body.updateDate = res.body.updateDate ? moment(res.body.updateDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((order: IOrderOna) => {
        order.createDate = order.createDate ? moment(order.createDate) : undefined;
        order.updateDate = order.updateDate ? moment(order.updateDate) : undefined;
      });
    }
    return res;
  }
}
