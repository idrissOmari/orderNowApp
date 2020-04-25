import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OrderNowAppSharedModule } from 'app/shared/shared.module';
import { MenuOnaComponent } from './menu-ona.component';
import { MenuOnaDetailComponent } from './menu-ona-detail.component';
import { MenuOnaUpdateComponent } from './menu-ona-update.component';
import { MenuOnaDeleteDialogComponent } from './menu-ona-delete-dialog.component';
import { menuRoute } from './menu-ona.route';

@NgModule({
  imports: [OrderNowAppSharedModule, RouterModule.forChild(menuRoute)],
  declarations: [MenuOnaComponent, MenuOnaDetailComponent, MenuOnaUpdateComponent, MenuOnaDeleteDialogComponent],
  entryComponents: [MenuOnaDeleteDialogComponent]
})
export class OrderNowAppMenuOnaModule {}
