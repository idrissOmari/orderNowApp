import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OrderNowAppSharedModule } from 'app/shared/shared.module';
import { AddressOnaComponent } from './address-ona.component';
import { AddressOnaDetailComponent } from './address-ona-detail.component';
import { AddressOnaUpdateComponent } from './address-ona-update.component';
import { AddressOnaDeleteDialogComponent } from './address-ona-delete-dialog.component';
import { addressRoute } from './address-ona.route';

@NgModule({
  imports: [OrderNowAppSharedModule, RouterModule.forChild(addressRoute)],
  declarations: [AddressOnaComponent, AddressOnaDetailComponent, AddressOnaUpdateComponent, AddressOnaDeleteDialogComponent],
  entryComponents: [AddressOnaDeleteDialogComponent]
})
export class OrderNowAppAddressOnaModule {}
