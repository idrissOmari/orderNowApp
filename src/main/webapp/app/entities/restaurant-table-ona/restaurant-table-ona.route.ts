import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRestaurantTableOna, RestaurantTableOna } from 'app/shared/model/restaurant-table-ona.model';
import { RestaurantTableOnaService } from './restaurant-table-ona.service';
import { RestaurantTableOnaComponent } from './restaurant-table-ona.component';
import { RestaurantTableOnaDetailComponent } from './restaurant-table-ona-detail.component';
import { RestaurantTableOnaUpdateComponent } from './restaurant-table-ona-update.component';

@Injectable({ providedIn: 'root' })
export class RestaurantTableOnaResolve implements Resolve<IRestaurantTableOna> {
  constructor(private service: RestaurantTableOnaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRestaurantTableOna> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((restaurantTable: HttpResponse<RestaurantTableOna>) => {
          if (restaurantTable.body) {
            return of(restaurantTable.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RestaurantTableOna());
  }
}

export const restaurantTableRoute: Routes = [
  {
    path: '',
    component: RestaurantTableOnaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'RestaurantTables'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RestaurantTableOnaDetailComponent,
    resolve: {
      restaurantTable: RestaurantTableOnaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'RestaurantTables'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RestaurantTableOnaUpdateComponent,
    resolve: {
      restaurantTable: RestaurantTableOnaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'RestaurantTables'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RestaurantTableOnaUpdateComponent,
    resolve: {
      restaurantTable: RestaurantTableOnaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'RestaurantTables'
    },
    canActivate: [UserRouteAccessService]
  }
];
