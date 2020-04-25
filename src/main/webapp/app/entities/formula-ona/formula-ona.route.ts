import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFormulaOna, FormulaOna } from 'app/shared/model/formula-ona.model';
import { FormulaOnaService } from './formula-ona.service';
import { FormulaOnaComponent } from './formula-ona.component';
import { FormulaOnaDetailComponent } from './formula-ona-detail.component';
import { FormulaOnaUpdateComponent } from './formula-ona-update.component';

@Injectable({ providedIn: 'root' })
export class FormulaOnaResolve implements Resolve<IFormulaOna> {
  constructor(private service: FormulaOnaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFormulaOna> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((formula: HttpResponse<FormulaOna>) => {
          if (formula.body) {
            return of(formula.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new FormulaOna());
  }
}

export const formulaRoute: Routes = [
  {
    path: '',
    component: FormulaOnaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Formulas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FormulaOnaDetailComponent,
    resolve: {
      formula: FormulaOnaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Formulas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FormulaOnaUpdateComponent,
    resolve: {
      formula: FormulaOnaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Formulas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FormulaOnaUpdateComponent,
    resolve: {
      formula: FormulaOnaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Formulas'
    },
    canActivate: [UserRouteAccessService]
  }
];
