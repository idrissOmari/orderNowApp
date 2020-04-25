import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrderOna } from 'app/shared/model/order-ona.model';
import { OrderOnaService } from './order-ona.service';

@Component({
  templateUrl: './order-ona-delete-dialog.component.html'
})
export class OrderOnaDeleteDialogComponent {
  order?: IOrderOna;

  constructor(protected orderService: OrderOnaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.orderService.delete(id).subscribe(() => {
      this.eventManager.broadcast('orderListModification');
      this.activeModal.close();
    });
  }
}
