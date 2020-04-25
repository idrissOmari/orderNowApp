import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductOrderOna } from 'app/shared/model/product-order-ona.model';

@Component({
  selector: 'jhi-product-order-ona-detail',
  templateUrl: './product-order-ona-detail.component.html'
})
export class ProductOrderOnaDetailComponent implements OnInit {
  productOrder: IProductOrderOna | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productOrder }) => (this.productOrder = productOrder));
  }

  previousState(): void {
    window.history.back();
  }
}
