import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IOrderOna, OrderOna } from 'app/shared/model/order-ona.model';
import { OrderOnaService } from './order-ona.service';

@Component({
  selector: 'jhi-order-ona-update',
  templateUrl: './order-ona-update.component.html'
})
export class OrderOnaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    totalPrice: [],
    status: [],
    createDate: [],
    updateDate: []
  });

  constructor(protected orderService: OrderOnaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ order }) => {
      if (!order.id) {
        const today = moment().startOf('day');
        order.createDate = today;
        order.updateDate = today;
      }

      this.updateForm(order);
    });
  }

  updateForm(order: IOrderOna): void {
    this.editForm.patchValue({
      id: order.id,
      totalPrice: order.totalPrice,
      status: order.status,
      createDate: order.createDate ? order.createDate.format(DATE_TIME_FORMAT) : null,
      updateDate: order.updateDate ? order.updateDate.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const order = this.createFromForm();
    if (order.id !== undefined) {
      this.subscribeToSaveResponse(this.orderService.update(order));
    } else {
      this.subscribeToSaveResponse(this.orderService.create(order));
    }
  }

  private createFromForm(): IOrderOna {
    return {
      ...new OrderOna(),
      id: this.editForm.get(['id'])!.value,
      totalPrice: this.editForm.get(['totalPrice'])!.value,
      status: this.editForm.get(['status'])!.value,
      createDate: this.editForm.get(['createDate'])!.value ? moment(this.editForm.get(['createDate'])!.value, DATE_TIME_FORMAT) : undefined,
      updateDate: this.editForm.get(['updateDate'])!.value ? moment(this.editForm.get(['updateDate'])!.value, DATE_TIME_FORMAT) : undefined
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrderOna>>): void {
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
}
