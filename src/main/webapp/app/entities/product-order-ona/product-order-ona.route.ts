import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProductOrderOna, ProductOrderOna } from 'app/shared/model/product-order-ona.model';
import { ProductOrderOnaService } from './product-order-ona.service';
import { ProductOrderOnaComponent } from './product-order-ona.component';
import { ProductOrderOnaDetailComponent } from './product-order-ona-detail.component';
import { ProductOrderOnaUpdateComponent } from './product-order-ona-update.component';

@Injectable({ providedIn: 'root' })
export class ProductOrderOnaResolve implements Resolve<IProductOrderOna> {
  constructor(private service: ProductOrderOnaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProductOrderOna> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((productOrder: HttpResponse<ProductOrderOna>) => {
          if (productOrder.body) {
            return of(productOrder.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProductOrderOna());
  }
}

export const productOrderRoute: Routes = [
  {
    path: '',
    component: ProductOrderOnaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ProductOrders'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProductOrderOnaDetailComponent,
    resolve: {
      productOrder: ProductOrderOnaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ProductOrders'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProductOrderOnaUpdateComponent,
    resolve: {
      productOrder: ProductOrderOnaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ProductOrders'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProductOrderOnaUpdateComponent,
    resolve: {
      productOrder: ProductOrderOnaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ProductOrders'
    },
    canActivate: [UserRouteAccessService]
  }
];
