import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRestaurantTableOna, RestaurantTableOna } from 'app/shared/model/restaurant-table-ona.model';
import { RestaurantTableOnaService } from './restaurant-table-ona.service';
import { IRestaurantOna } from 'app/shared/model/restaurant-ona.model';
import { RestaurantOnaService } from 'app/entities/restaurant-ona/restaurant-ona.service';
import { IOrderOna } from 'app/shared/model/order-ona.model';
import { OrderOnaService } from 'app/entities/order-ona/order-ona.service';

type SelectableEntity = IRestaurantOna | IOrderOna;

@Component({
  selector: 'jhi-restaurant-table-ona-update',
  templateUrl: './restaurant-table-ona-update.component.html'
})
export class RestaurantTableOnaUpdateComponent implements OnInit {
  isSaving = false;
  restaurants: IRestaurantOna[] = [];
  orders: IOrderOna[] = [];

  editForm = this.fb.group({
    id: [],
    tNumber: [],
    tStatus: [],
    restaurantId: [],
    orderId: []
  });

  constructor(
    protected restaurantTableService: RestaurantTableOnaService,
    protected restaurantService: RestaurantOnaService,
    protected orderService: OrderOnaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ restaurantTable }) => {
      this.updateForm(restaurantTable);

      this.restaurantService.query().subscribe((res: HttpResponse<IRestaurantOna[]>) => (this.restaurants = res.body || []));

      this.orderService.query().subscribe((res: HttpResponse<IOrderOna[]>) => (this.orders = res.body || []));
    });
  }

  updateForm(restaurantTable: IRestaurantTableOna): void {
    this.editForm.patchValue({
      id: restaurantTable.id,
      tNumber: restaurantTable.tNumber,
      tStatus: restaurantTable.tStatus,
      restaurantId: restaurantTable.restaurantId,
      orderId: restaurantTable.orderId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const restaurantTable = this.createFromForm();
    if (restaurantTable.id !== undefined) {
      this.subscribeToSaveResponse(this.restaurantTableService.update(restaurantTable));
    } else {
      this.subscribeToSaveResponse(this.restaurantTableService.create(restaurantTable));
    }
  }

  private createFromForm(): IRestaurantTableOna {
    return {
      ...new RestaurantTableOna(),
      id: this.editForm.get(['id'])!.value,
      tNumber: this.editForm.get(['tNumber'])!.value,
      tStatus: this.editForm.get(['tStatus'])!.value,
      restaurantId: this.editForm.get(['restaurantId'])!.value,
      orderId: this.editForm.get(['orderId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRestaurantTableOna>>): void {
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
