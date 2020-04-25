import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRestaurantTableOna } from 'app/shared/model/restaurant-table-ona.model';

@Component({
  selector: 'jhi-restaurant-table-ona-detail',
  templateUrl: './restaurant-table-ona-detail.component.html'
})
export class RestaurantTableOnaDetailComponent implements OnInit {
  restaurantTable: IRestaurantTableOna | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ restaurantTable }) => (this.restaurantTable = restaurantTable));
  }

  previousState(): void {
    window.history.back();
  }
}
