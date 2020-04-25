import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProductOrderOna, ProductOrderOna } from 'app/shared/model/product-order-ona.model';
import { ProductOrderOnaService } from './product-order-ona.service';
import { IProductOna } from 'app/shared/model/product-ona.model';
import { ProductOnaService } from 'app/entities/product-ona/product-ona.service';
import { IOrderOna } from 'app/shared/model/order-ona.model';
import { OrderOnaService } from 'app/entities/order-ona/order-ona.service';

type SelectableEntity = IProductOna | IOrderOna;

@Component({
  selector: 'jhi-product-order-ona-update',
  templateUrl: './product-order-ona-update.component.html'
})
export class ProductOrderOnaUpdateComponent implements OnInit {
  isSaving = false;
  products: IProductOna[] = [];
  orders: IOrderOna[] = [];

  editForm = this.fb.group({
    id: [],
    quantity: [],
    productId: [],
    orderId: []
  });

  constructor(
    protected productOrderService: ProductOrderOnaService,
    protected productService: ProductOnaService,
    protected orderService: OrderOnaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productOrder }) => {
      this.updateForm(productOrder);

      this.productService.query().subscribe((res: HttpResponse<IProductOna[]>) => (this.products = res.body || []));

      this.orderService.query().subscribe((res: HttpResponse<IOrderOna[]>) => (this.orders = res.body || []));
    });
  }

  updateForm(productOrder: IProductOrderOna): void {
    this.editForm.patchValue({
      id: productOrder.id,
      quantity: productOrder.quantity,
      productId: productOrder.productId,
      orderId: productOrder.orderId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const productOrder = this.createFromForm();
    if (productOrder.id !== undefined) {
      this.subscribeToSaveResponse(this.productOrderService.update(productOrder));
    } else {
      this.subscribeToSaveResponse(this.productOrderService.create(productOrder));
    }
  }

  private createFromForm(): IProductOrderOna {
    return {
      ...new ProductOrderOna(),
      id: this.editForm.get(['id'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      productId: this.editForm.get(['productId'])!.value,
      orderId: this.editForm.get(['orderId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductOrderOna>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
