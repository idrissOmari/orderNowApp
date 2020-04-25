import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductOna } from 'app/shared/model/product-ona.model';

@Component({
  selector: 'jhi-product-ona-detail',
  templateUrl: './product-ona-detail.component.html'
})
export class ProductOnaDetailComponent implements OnInit {
  product: IProductOna | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ product }) => (this.product = product));
  }

  previousState(): void {
    window.history.back();
  }
}
