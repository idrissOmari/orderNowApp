import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAddressOna, AddressOna } from 'app/shared/model/address-ona.model';
import { AddressOnaService } from './address-ona.service';
import { AddressOnaComponent } from './address-ona.component';
import { AddressOnaDetailComponent } from './address-ona-detail.component';
import { AddressOnaUpdateComponent } from './address-ona-update.component';

@Injectable({ providedIn: 'root' })
export class AddressOnaResolve implements Resolve<IAddressOna> {
  constructor(private service: AddressOnaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAddressOna> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((address: HttpResponse<AddressOna>) => {
          if (address.body) {
            return of(address.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AddressOna());
  }
}

export const addressRoute: Routes = [
  {
    path: '',
    component: AddressOnaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Addresses'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AddressOnaDetailComponent,
    resolve: {
      address: AddressOnaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Addresses'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AddressOnaUpdateComponent,
    resolve: {
      address: AddressOnaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Addresses'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AddressOnaUpdateComponent,
    resolve: {
      address: AddressOnaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Addresses'
    },
    canActivate: [UserRouteAccessService]
  }
];
