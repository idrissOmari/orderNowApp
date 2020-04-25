import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OrderNowAppSharedModule } from 'app/shared/shared.module';
import { RestaurantTableOnaComponent } from './restaurant-table-ona.component';
import { RestaurantTableOnaDetailComponent } from './restaurant-table-ona-detail.component';
import { RestaurantTableOnaUpdateComponent } from './restaurant-table-ona-update.component';
import { RestaurantTableOnaDeleteDialogComponent } from './restaurant-table-ona-delete-dialog.component';
import { restaurantTableRoute } from './restaurant-table-ona.route';

@NgModule({
  imports: [OrderNowAppSharedModule, RouterModule.forChild(restaurantTableRoute)],
  declarations: [
    RestaurantTableOnaComponent,
    RestaurantTableOnaDetailComponent,
    RestaurantTableOnaUpdateComponent,
    RestaurantTableOnaDeleteDialogComponent
  ],
  entryComponents: [RestaurantTableOnaDeleteDialogComponent]
})
export class OrderNowAppRestaurantTableOnaModule {}
