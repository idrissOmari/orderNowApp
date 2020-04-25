import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAddressOna } from 'app/shared/model/address-ona.model';

@Component({
  selector: 'jhi-address-ona-detail',
  templateUrl: './address-ona-detail.component.html'
})
export class AddressOnaDetailComponent implements OnInit {
  address: IAddressOna | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ address }) => (this.address = address));
  }

  previousState(): void {
    window.history.back();
  }
}
