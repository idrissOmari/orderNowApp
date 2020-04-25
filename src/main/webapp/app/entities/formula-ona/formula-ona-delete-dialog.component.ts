import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFormulaOna } from 'app/shared/model/formula-ona.model';
import { FormulaOnaService } from './formula-ona.service';

@Component({
  templateUrl: './formula-ona-delete-dialog.component.html'
})
export class FormulaOnaDeleteDialogComponent {
  formula?: IFormulaOna;

  constructor(protected formulaService: FormulaOnaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.formulaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('formulaListModification');
      this.activeModal.close();
    });
  }
}
