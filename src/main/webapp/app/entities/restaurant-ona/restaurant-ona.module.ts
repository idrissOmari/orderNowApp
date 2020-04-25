import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OrderNowAppSharedModule } from 'app/shared/shared.module';
import { RestaurantOnaComponent } from './restaurant-ona.component';
import { RestaurantOnaDetailComponent } from './restaurant-ona-detail.component';
import { RestaurantOnaUpdateComponent } from './restaurant-ona-update.component';
import { RestaurantOnaDeleteDialogComponent } from './restaurant-ona-delete-dialog.component';
import { restaurantRoute } from './restaurant-ona.route';

@NgModule({
  imports: [OrderNowAppSharedModule, RouterModule.forChild(restaurantRoute)],
  declarations: [RestaurantOnaComponent, RestaurantOnaDetailComponent, RestaurantOnaUpdateComponent, RestaurantOnaDeleteDialogComponent],
  entryComponents: [RestaurantOnaDeleteDialogComponent]
})
export class OrderNowAppRestaurantOnaModule {}
