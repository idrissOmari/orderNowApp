import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFormulaOna } from 'app/shared/model/formula-ona.model';

type EntityResponseType = HttpResponse<IFormulaOna>;
type EntityArrayResponseType = HttpResponse<IFormulaOna[]>;

@Injectable({ providedIn: 'root' })
export class FormulaOnaService {
  public resourceUrl = SERVER_API_URL + 'api/formulas';

  constructor(protected http: HttpClient) {}

  create(formula: IFormulaOna): Observable<EntityResponseType> {
    return this.http.post<IFormulaOna>(this.resourceUrl, formula, { observe: 'response' });
  }

  update(formula: IFormulaOna): Observable<EntityResponseType> {
    return this.http.put<IFormulaOna>(this.resourceUrl, formula, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFormulaOna>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFormulaOna[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
