import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OrderNowAppSharedModule } from 'app/shared/shared.module';
import { MenuCategoryOnaComponent } from './menu-category-ona.component';
import { MenuCategoryOnaDetailComponent } from './menu-category-ona-detail.component';
import { MenuCategoryOnaUpdateComponent } from './menu-category-ona-update.component';
import { MenuCategoryOnaDeleteDialogComponent } from './menu-category-ona-delete-dialog.component';
import { menuCategoryRoute } from './menu-category-ona.route';

@NgModule({
  imports: [OrderNowAppSharedModule, RouterModule.forChild(menuCategoryRoute)],
  declarations: [
    MenuCategoryOnaComponent,
    MenuCategoryOnaDetailComponent,
    MenuCategoryOnaUpdateComponent,
    MenuCategoryOnaDeleteDialogComponent
  ],
  entryComponents: [MenuCategoryOnaDeleteDialogComponent]
})
export class OrderNowAppMenuCategoryOnaModule {}
