import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFormulaOrderOna } from 'app/shared/model/formula-order-ona.model';
import { FormulaOrderOnaService } from './formula-order-ona.service';
import { FormulaOrderOnaDeleteDialogComponent } from './formula-order-ona-delete-dialog.component';

@Component({
  selector: 'jhi-formula-order-ona',
  templateUrl: './formula-order-ona.component.html'
})
export class FormulaOrderOnaComponent implements OnInit, OnDestroy {
  formulaOrders?: IFormulaOrderOna[];
  eventSubscriber?: Subscription;

  constructor(
    protected formulaOrderService: FormulaOrderOnaService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.formulaOrderService.query().subscribe((res: HttpResponse<IFormulaOrderOna[]>) => (this.formulaOrders = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFormulaOrders();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFormulaOrderOna): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFormulaOrders(): void {
    this.eventSubscriber = this.eventManager.subscribe('formulaOrderListModification', () => this.loadAll());
  }

  delete(formulaOrder: IFormulaOrderOna): void {
    const modalRef = this.modalService.open(FormulaOrderOnaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.formulaOrder = formulaOrder;
  }
}
