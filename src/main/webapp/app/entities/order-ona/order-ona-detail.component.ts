import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrderOna } from 'app/shared/model/order-ona.model';

@Component({
  selector: 'jhi-order-ona-detail',
  templateUrl: './order-ona-detail.component.html'
})
export class OrderOnaDetailComponent implements OnInit {
  order: IOrderOna | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ order }) => (this.order = order));
  }

  previousState(): void {
    window.history.back();
  }
}
