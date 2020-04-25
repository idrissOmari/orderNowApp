import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRestaurantOna } from 'app/shared/model/restaurant-ona.model';

@Component({
  selector: 'jhi-restaurant-ona-detail',
  templateUrl: './restaurant-ona-detail.component.html'
})
export class RestaurantOnaDetailComponent implements OnInit {
  restaurant: IRestaurantOna | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ restaurant }) => (this.restaurant = restaurant));
  }

  previousState(): void {
    window.history.back();
  }
}
