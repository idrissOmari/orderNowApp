import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAddressOna, AddressOna } from 'app/shared/model/address-ona.model';
import { AddressOnaService } from './address-ona.service';

@Component({
  selector: 'jhi-address-ona-update',
  templateUrl: './address-ona-update.component.html'
})
export class AddressOnaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    adresse1: [],
    adresse2: [],
    postalCode: [],
    city: [],
    country: []
  });

  constructor(protected addressService: AddressOnaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ address }) => {
      this.updateForm(address);
    });
  }

  updateForm(address: IAddressOna): void {
    this.editForm.patchValue({
      id: address.id,
      adresse1: address.adresse1,
      adresse2: address.adresse2,
      postalCode: address.postalCode,
      city: address.city,
      country: address.country
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const address = this.createFromForm();
    if (address.id !== undefined) {
      this.subscribeToSaveResponse(this.addressService.update(address));
    } else {
      this.subscribeToSaveResponse(this.addressService.create(address));
    }
  }

  private createFromForm(): IAddressOna {
    return {
      ...new AddressOna(),
      id: this.editForm.get(['id'])!.value,
      adresse1: this.editForm.get(['adresse1'])!.value,
      adresse2: this.editForm.get(['adresse2'])!.value,
      postalCode: this.editForm.get(['postalCode'])!.value,
      city: this.editForm.get(['city'])!.value,
      country: this.editForm.get(['country'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAddressOna>>): void {
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
