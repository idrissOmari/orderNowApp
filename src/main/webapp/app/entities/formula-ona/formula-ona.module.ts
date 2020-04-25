import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OrderNowAppSharedModule } from 'app/shared/shared.module';
import { FormulaOnaComponent } from './formula-ona.component';
import { FormulaOnaDetailComponent } from './formula-ona-detail.component';
import { FormulaOnaUpdateComponent } from './formula-ona-update.component';
import { FormulaOnaDeleteDialogComponent } from './formula-ona-delete-dialog.component';
import { formulaRoute } from './formula-ona.route';

@NgModule({
  imports: [OrderNowAppSharedModule, RouterModule.forChild(formulaRoute)],
  declarations: [FormulaOnaComponent, FormulaOnaDetailComponent, FormulaOnaUpdateComponent, FormulaOnaDeleteDialogComponent],
  entryComponents: [FormulaOnaDeleteDialogComponent]
})
export class OrderNowAppFormulaOnaModule {}
