import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFormulaOrderOna } from 'app/shared/model/formula-order-ona.model';
import { FormulaOrderOnaService } from './formula-order-ona.service';

@Component({
  templateUrl: './formula-order-ona-delete-dialog.component.html'
})
export class FormulaOrderOnaDeleteDialogComponent {
  formulaOrder?: IFormulaOrderOna;

  constructor(
    protected formulaOrderService: FormulaOrderOnaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.formulaOrderService.delete(id).subscribe(() => {
      this.eventManager.broadcast('formulaOrderListModification');
      this.activeModal.close();
    });
  }
}
