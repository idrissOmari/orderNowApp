import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProductOna } from 'app/shared/model/product-ona.model';
import { ProductOnaService } from './product-ona.service';
import { ProductOnaDeleteDialogComponent } from './product-ona-delete-dialog.component';

@Component({
  selector: 'jhi-product-ona',
  templateUrl: './product-ona.component.html'
})
export class ProductOnaComponent implements OnInit, OnDestroy {
  products?: IProductOna[];
  eventSubscriber?: Subscription;

  constructor(protected productService: ProductOnaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.productService.query().subscribe((res: HttpResponse<IProductOna[]>) => (this.products = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProducts();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProductOna): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProducts(): void {
    this.eventSubscriber = this.eventManager.subscribe('productListModification', () => this.loadAll());
  }

  delete(product: IProductOna): void {
    const modalRef = this.modalService.open(ProductOnaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.product = product;
  }
}
