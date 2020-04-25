import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProductOrderOna } from 'app/shared/model/product-order-ona.model';
import { ProductOrderOnaService } from './product-order-ona.service';
import { ProductOrderOnaDeleteDialogComponent } from './product-order-ona-delete-dialog.component';

@Component({
  selector: 'jhi-product-order-ona',
  templateUrl: './product-order-ona.component.html'
})
export class ProductOrderOnaComponent implements OnInit, OnDestroy {
  productOrders?: IProductOrderOna[];
  eventSubscriber?: Subscription;

  constructor(
    protected productOrderService: ProductOrderOnaService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.productOrderService.query().subscribe((res: HttpResponse<IProductOrderOna[]>) => (this.productOrders = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProductOrders();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProductOrderOna): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProductOrders(): void {
    this.eventSubscriber = this.eventManager.subscribe('productOrderListModification', () => this.loadAll());
  }

  delete(productOrder: IProductOrderOna): void {
    const modalRef = this.modalService.open(ProductOrderOnaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.productOrder = productOrder;
  }
}
