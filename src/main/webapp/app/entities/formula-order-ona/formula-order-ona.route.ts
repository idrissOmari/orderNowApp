import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFormulaOrderOna, FormulaOrderOna } from 'app/shared/model/formula-order-ona.model';
import { FormulaOrderOnaService } from './formula-order-ona.service';
import { FormulaOrderOnaComponent } from './formula-order-ona.component';
import { FormulaOrderOnaDetailComponent } from './formula-order-ona-detail.component';
import { FormulaOrderOnaUpdateComponent } from './formula-order-ona-update.component';

@Injectable({ providedIn: 'root' })
export class FormulaOrderOnaResolve implements Resolve<IFormulaOrderOna> {
  constructor(private service: FormulaOrderOnaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFormulaOrderOna> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((formulaOrder: HttpResponse<FormulaOrderOna>) => {
          if (formulaOrder.body) {
            return of(formulaOrder.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new FormulaOrderOna());
  }
}

export const formulaOrderRoute: Routes = [
  {
    path: '',
    component: FormulaOrderOnaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'FormulaOrders'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FormulaOrderOnaDetailComponent,
    resolve: {
      formulaOrder: FormulaOrderOnaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'FormulaOrders'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FormulaOrderOnaUpdateComponent,
    resolve: {
      formulaOrder: FormulaOrderOnaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'FormulaOrders'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FormulaOrderOnaUpdateComponent,
    resolve: {
      formulaOrder: FormulaOrderOnaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'FormulaOrders'
    },
    canActivate: [UserRouteAccessService]
  }
];
