import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OrderNowAppSharedModule } from 'app/shared/shared.module';
import { OrderOnaComponent } from './order-ona.component';
import { OrderOnaDetailComponent } from './order-ona-detail.component';
import { OrderOnaUpdateComponent } from './order-ona-update.component';
import { OrderOnaDeleteDialogComponent } from './order-ona-delete-dialog.component';
import { orderRoute } from './order-ona.route';

@NgModule({
  imports: [OrderNowAppSharedModule, RouterModule.forChild(orderRoute)],
  declarations: [OrderOnaComponent, OrderOnaDetailComponent, OrderOnaUpdateComponent, OrderOnaDeleteDialogComponent],
  entryComponents: [OrderOnaDeleteDialogComponent]
})
export class OrderNowAppOrderOnaModule {}
