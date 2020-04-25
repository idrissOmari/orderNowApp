import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'restaurant-ona',
        loadChildren: () => import('./restaurant-ona/restaurant-ona.module').then(m => m.OrderNowAppRestaurantOnaModule)
      },
      {
        path: 'address-ona',
        loadChildren: () => import('./address-ona/address-ona.module').then(m => m.OrderNowAppAddressOnaModule)
      },
      {
        path: 'restaurant-table-ona',
        loadChildren: () => import('./restaurant-table-ona/restaurant-table-ona.module').then(m => m.OrderNowAppRestaurantTableOnaModule)
      },
      {
        path: 'menu-ona',
        loadChildren: () => import('./menu-ona/menu-ona.module').then(m => m.OrderNowAppMenuOnaModule)
      },
      {
        path: 'formula-ona',
        loadChildren: () => import('./formula-ona/formula-ona.module').then(m => m.OrderNowAppFormulaOnaModule)
      },
      {
        path: 'menu-category-ona',
        loadChildren: () => import('./menu-category-ona/menu-category-ona.module').then(m => m.OrderNowAppMenuCategoryOnaModule)
      },
      {
        path: 'product-ona',
        loadChildren: () => import('./product-ona/product-ona.module').then(m => m.OrderNowAppProductOnaModule)
      },
      {
        path: 'order-ona',
        loadChildren: () => import('./order-ona/order-ona.module').then(m => m.OrderNowAppOrderOnaModule)
      },
      {
        path: 'product-order-ona',
        loadChildren: () => import('./product-order-ona/product-order-ona.module').then(m => m.OrderNowAppProductOrderOnaModule)
      },
      {
        path: 'formula-order-ona',
        loadChildren: () => import('./formula-order-ona/formula-order-ona.module').then(m => m.OrderNowAppFormulaOrderOnaModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class OrderNowAppEntityModule {}
