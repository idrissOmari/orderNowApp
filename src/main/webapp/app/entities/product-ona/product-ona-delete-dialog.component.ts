import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductOna } from 'app/shared/model/product-ona.model';
import { ProductOnaService } from './product-ona.service';

@Component({
  templateUrl: './product-ona-delete-dialog.component.html'
})
export class ProductOnaDeleteDialogComponent {
  product?: IProductOna;

  constructor(protected productService: ProductOnaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.productService.delete(id).subscribe(() => {
      this.eventManager.broadcast('productListModification');
      this.activeModal.close();
    });
  }
}
