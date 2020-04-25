import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFormulaOna } from 'app/shared/model/formula-ona.model';
import { FormulaOnaService } from './formula-ona.service';
import { FormulaOnaDeleteDialogComponent } from './formula-ona-delete-dialog.component';

@Component({
  selector: 'jhi-formula-ona',
  templateUrl: './formula-ona.component.html'
})
export class FormulaOnaComponent implements OnInit, OnDestroy {
  formulas?: IFormulaOna[];
  eventSubscriber?: Subscription;

  constructor(protected formulaService: FormulaOnaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.formulaService.query().subscribe((res: HttpResponse<IFormulaOna[]>) => (this.formulas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFormulas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFormulaOna): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFormulas(): void {
    this.eventSubscriber = this.eventManager.subscribe('formulaListModification', () => this.loadAll());
  }

  delete(formula: IFormulaOna): void {
    const modalRef = this.modalService.open(FormulaOnaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.formula = formula;
  }
}
