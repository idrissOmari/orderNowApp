import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFormulaOrderOna, FormulaOrderOna } from 'app/shared/model/formula-order-ona.model';
import { FormulaOrderOnaService } from './formula-order-ona.service';
import { IProductOna } from 'app/shared/model/product-ona.model';
import { ProductOnaService } from 'app/entities/product-ona/product-ona.service';
import { IOrderOna } from 'app/shared/model/order-ona.model';
import { OrderOnaService } from 'app/entities/order-ona/order-ona.service';

type SelectableEntity = IProductOna | IOrderOna;

@Component({
  selector: 'jhi-formula-order-ona-update',
  templateUrl: './formula-order-ona-update.component.html'
})
export class FormulaOrderOnaUpdateComponent implements OnInit {
  isSaving = false;
  products: IProductOna[] = [];
  orders: IOrderOna[] = [];

  editForm = this.fb.group({
    id: [],
    quantity: [],
    listProducts: [],
    orderId: []
  });

  constructor(
    protected formulaOrderService: FormulaOrderOnaService,
    protected productService: ProductOnaService,
    protected orderService: OrderOnaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ formulaOrder }) => {
      this.updateForm(formulaOrder);

      this.productService.query().subscribe((res: HttpResponse<IProductOna[]>) => (this.products = res.body || []));

      this.orderService.query().subscribe((res: HttpResponse<IOrderOna[]>) => (this.orders = res.body || []));
    });
  }

  updateForm(formulaOrder: IFormulaOrderOna): void {
    this.editForm.patchValue({
      id: formulaOrder.id,
      quantity: formulaOrder.quantity,
      listProducts: formulaOrder.listProducts,
      orderId: formulaOrder.orderId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const formulaOrder = this.createFromForm();
    if (formulaOrder.id !== undefined) {
      this.subscribeToSaveResponse(this.formulaOrderService.update(formulaOrder));
    } else {
      this.subscribeToSaveResponse(this.formulaOrderService.create(formulaOrder));
    }
  }

  private createFromForm(): IFormulaOrderOna {
    return {
      ...new FormulaOrderOna(),
      id: this.editForm.get(['id'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      listProducts: this.editForm.get(['listProducts'])!.value,
      orderId: this.editForm.get(['orderId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFormulaOrderOna>>): void {
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

  getSelected(selectedVals: IProductOna[], option: IProductOna): IProductOna {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
