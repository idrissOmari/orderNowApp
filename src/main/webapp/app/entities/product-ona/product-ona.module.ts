import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OrderNowAppSharedModule } from 'app/shared/shared.module';
import { ProductOnaComponent } from './product-ona.component';
import { ProductOnaDetailComponent } from './product-ona-detail.component';
import { ProductOnaUpdateComponent } from './product-ona-update.component';
import { ProductOnaDeleteDialogComponent } from './product-ona-delete-dialog.component';
import { productRoute } from './product-ona.route';

@NgModule({
  imports: [OrderNowAppSharedModule, RouterModule.forChild(productRoute)],
  declarations: [ProductOnaComponent, ProductOnaDetailComponent, ProductOnaUpdateComponent, ProductOnaDeleteDialogComponent],
  entryComponents: [ProductOnaDeleteDialogComponent]
})
export class OrderNowAppProductOnaModule {}
