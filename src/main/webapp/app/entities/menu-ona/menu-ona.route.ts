import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMenuOna, MenuOna } from 'app/shared/model/menu-ona.model';
import { MenuOnaService } from './menu-ona.service';
import { MenuOnaComponent } from './menu-ona.component';
import { MenuOnaDetailComponent } from './menu-ona-detail.component';
import { MenuOnaUpdateComponent } from './menu-ona-update.component';

@Injectable({ providedIn: 'root' })
export class MenuOnaResolve implements Resolve<IMenuOna> {
  constructor(private service: MenuOnaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMenuOna> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((menu: HttpResponse<MenuOna>) => {
          if (menu.body) {
            return of(menu.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MenuOna());
  }
}

export const menuRoute: Routes = [
  {
    path: '',
    component: MenuOnaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Menus'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MenuOnaDetailComponent,
    resolve: {
      menu: MenuOnaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Menus'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MenuOnaUpdateComponent,
    resolve: {
      menu: MenuOnaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Menus'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MenuOnaUpdateComponent,
    resolve: {
      menu: MenuOnaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Menus'
    },
    canActivate: [UserRouteAccessService]
  }
];
