import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRestaurantOna, RestaurantOna } from 'app/shared/model/restaurant-ona.model';
import { RestaurantOnaService } from './restaurant-ona.service';
import { IAddressOna } from 'app/shared/model/address-ona.model';
import { AddressOnaService } from 'app/entities/address-ona/address-ona.service';

@Component({
  selector: 'jhi-restaurant-ona-update',
  templateUrl: './restaurant-ona-update.component.html'
})
export class RestaurantOnaUpdateComponent implements OnInit {
  isSaving = false;
  addresses: IAddressOna[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [],
    tel: [],
    email: [],
    description: [],
    addressId: []
  });

  constructor(
    protected restaurantService: RestaurantOnaService,
    protected addressService: AddressOnaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ restaurant }) => {
      this.updateForm(restaurant);

      this.addressService
        .query({ filter: 'restaurant-is-null' })
        .pipe(
          map((res: HttpResponse<IAddressOna[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IAddressOna[]) => {
          if (!restaurant.addressId) {
            this.addresses = resBody;
          } else {
            this.addressService
              .find(restaurant.addressId)
              .pipe(
                map((subRes: HttpResponse<IAddressOna>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IAddressOna[]) => (this.addresses = concatRes));
          }
        });
    });
  }

  updateForm(restaurant: IRestaurantOna): void {
    this.editForm.patchValue({
      id: restaurant.id,
      nom: restaurant.nom,
      tel: restaurant.tel,
      email: restaurant.email,
      description: restaurant.description,
      addressId: restaurant.addressId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const restaurant = this.createFromForm();
    if (restaurant.id !== undefined) {
      this.subscribeToSaveResponse(this.restaurantService.update(restaurant));
    } else {
      this.subscribeToSaveResponse(this.restaurantService.create(restaurant));
    }
  }

  private createFromForm(): IRestaurantOna {
    return {
      ...new RestaurantOna(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      tel: this.editForm.get(['tel'])!.value,
      email: this.editForm.get(['email'])!.value,
      description: this.editForm.get(['description'])!.value,
      addressId: this.editForm.get(['addressId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRestaurantOna>>): void {
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

  trackById(index: number, item: IAddressOna): any {
    return item.id;
  }
}
