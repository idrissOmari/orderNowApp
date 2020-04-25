import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IOrderOna, OrderOna } from 'app/shared/model/order-ona.model';
import { OrderOnaService } from './order-ona.service';
import { OrderOnaComponent } from './order-ona.component';
import { OrderOnaDetailComponent } from './order-ona-detail.component';
import { OrderOnaUpdateComponent } from './order-ona-update.component';

@Injectable({ providedIn: 'root' })
export class OrderOnaResolve implements Resolve<IOrderOna> {
  constructor(private service: OrderOnaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOrderOna> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((order: HttpResponse<OrderOna>) => {
          if (order.body) {
            return of(order.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new OrderOna());
  }
}

export const orderRoute: Routes = [
  {
    path: '',
    component: OrderOnaComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'Orders'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OrderOnaDetailComponent,
    resolve: {
      order: OrderOnaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Orders'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OrderOnaUpdateComponent,
    resolve: {
      order: OrderOnaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Orders'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OrderOnaUpdateComponent,
    resolve: {
      order: OrderOnaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Orders'
    },
    canActivate: [UserRouteAccessService]
  }
];
