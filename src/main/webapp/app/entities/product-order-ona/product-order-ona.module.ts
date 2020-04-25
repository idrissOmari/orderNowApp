import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OrderNowAppSharedModule } from 'app/shared/shared.module';
import { ProductOrderOnaComponent } from './product-order-ona.component';
import { ProductOrderOnaDetailComponent } from './product-order-ona-detail.component';
import { ProductOrderOnaUpdateComponent } from './product-order-ona-update.component';
import { ProductOrderOnaDeleteDialogComponent } from './product-order-ona-delete-dialog.component';
import { productOrderRoute } from './product-order-ona.route';

@NgModule({
  imports: [OrderNowAppSharedModule, RouterModule.forChild(productOrderRoute)],
  declarations: [
    ProductOrderOnaComponent,
    ProductOrderOnaDetailComponent,
    ProductOrderOnaUpdateComponent,
    ProductOrderOnaDeleteDialogComponent
  ],
  entryComponents: [ProductOrderOnaDeleteDialogComponent]
})
export class OrderNowAppProductOrderOnaModule {}
