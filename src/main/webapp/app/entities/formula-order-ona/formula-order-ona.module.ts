import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OrderNowAppSharedModule } from 'app/shared/shared.module';
import { FormulaOrderOnaComponent } from './formula-order-ona.component';
import { FormulaOrderOnaDetailComponent } from './formula-order-ona-detail.component';
import { FormulaOrderOnaUpdateComponent } from './formula-order-ona-update.component';
import { FormulaOrderOnaDeleteDialogComponent } from './formula-order-ona-delete-dialog.component';
import { formulaOrderRoute } from './formula-order-ona.route';

@NgModule({
  imports: [OrderNowAppSharedModule, RouterModule.forChild(formulaOrderRoute)],
  declarations: [
    FormulaOrderOnaComponent,
    FormulaOrderOnaDetailComponent,
    FormulaOrderOnaUpdateComponent,
    FormulaOrderOnaDeleteDialogComponent
  ],
  entryComponents: [FormulaOrderOnaDeleteDialogComponent]
})
export class OrderNowAppFormulaOrderOnaModule {}
