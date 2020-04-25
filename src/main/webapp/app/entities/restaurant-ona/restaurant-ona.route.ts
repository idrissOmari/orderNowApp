import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRestaurantOna, RestaurantOna } from 'app/shared/model/restaurant-ona.model';
import { RestaurantOnaService } from './restaurant-ona.service';
import { RestaurantOnaComponent } from './restaurant-ona.component';
import { RestaurantOnaDetailComponent } from './restaurant-ona-detail.component';
import { RestaurantOnaUpdateComponent } from './restaurant-ona-update.component';

@Injectable({ providedIn: 'root' })
export class RestaurantOnaResolve implements Resolve<IRestaurantOna> {
  constructor(private service: RestaurantOnaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRestaurantOna> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((restaurant: HttpResponse<RestaurantOna>) => {
          if (restaurant.body) {
            return of(restaurant.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RestaurantOna());
  }
}

export const restaurantRoute: Routes = [
  {
    path: '',
    component: RestaurantOnaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Restaurants'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RestaurantOnaDetailComponent,
    resolve: {
      restaurant: RestaurantOnaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Restaurants'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RestaurantOnaUpdateComponent,
    resolve: {
      restaurant: RestaurantOnaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Restaurants'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RestaurantOnaUpdateComponent,
    resolve: {
      restaurant: RestaurantOnaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Restaurants'
    },
    canActivate: [UserRouteAccessService]
  }
];
