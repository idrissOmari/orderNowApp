import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMenuCategoryOna, MenuCategoryOna } from 'app/shared/model/menu-category-ona.model';
import { MenuCategoryOnaService } from './menu-category-ona.service';
import { MenuCategoryOnaComponent } from './menu-category-ona.component';
import { MenuCategoryOnaDetailComponent } from './menu-category-ona-detail.component';
import { MenuCategoryOnaUpdateComponent } from './menu-category-ona-update.component';

@Injectable({ providedIn: 'root' })
export class MenuCategoryOnaResolve implements Resolve<IMenuCategoryOna> {
  constructor(private service: MenuCategoryOnaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMenuCategoryOna> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((menuCategory: HttpResponse<MenuCategoryOna>) => {
          if (menuCategory.body) {
            return of(menuCategory.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MenuCategoryOna());
  }
}

export const menuCategoryRoute: Routes = [
  {
    path: '',
    component: MenuCategoryOnaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'MenuCategories'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MenuCategoryOnaDetailComponent,
    resolve: {
      menuCategory: MenuCategoryOnaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'MenuCategories'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MenuCategoryOnaUpdateComponent,
    resolve: {
      menuCategory: MenuCategoryOnaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'MenuCategories'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MenuCategoryOnaUpdateComponent,
    resolve: {
      menuCategory: MenuCategoryOnaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'MenuCategories'
    },
    canActivate: [UserRouteAccessService]
  }
];
