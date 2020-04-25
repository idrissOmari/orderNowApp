import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductOrderOna } from 'app/shared/model/product-order-ona.model';
import { ProductOrderOnaService } from './product-order-ona.service';

@Component({
  templateUrl: './product-order-ona-delete-dialog.component.html'
})
export class ProductOrderOnaDeleteDialogComponent {
  productOrder?: IProductOrderOna;

  constructor(
    protected productOrderService: ProductOrderOnaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.productOrderService.delete(id).subscribe(() => {
      this.eventManager.broadcast('productOrderListModification');
      this.activeModal.close();
    });
  }
}
