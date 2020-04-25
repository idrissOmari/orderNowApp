import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProductOna, ProductOna } from 'app/shared/model/product-ona.model';
import { ProductOnaService } from './product-ona.service';
import { ProductOnaComponent } from './product-ona.component';
import { ProductOnaDetailComponent } from './product-ona-detail.component';
import { ProductOnaUpdateComponent } from './product-ona-update.component';

@Injectable({ providedIn: 'root' })
export class ProductOnaResolve implements Resolve<IProductOna> {
  constructor(private service: ProductOnaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProductOna> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((product: HttpResponse<ProductOna>) => {
          if (product.body) {
            return of(product.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProductOna());
  }
}

export const productRoute: Routes = [
  {
    path: '',
    component: ProductOnaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Products'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProductOnaDetailComponent,
    resolve: {
      product: ProductOnaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Products'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProductOnaUpdateComponent,
    resolve: {
      product: ProductOnaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Products'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProductOnaUpdateComponent,
    resolve: {
      product: ProductOnaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Products'
    },
    canActivate: [UserRouteAccessService]
  }
];
