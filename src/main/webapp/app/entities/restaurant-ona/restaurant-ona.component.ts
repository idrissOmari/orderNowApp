import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRestaurantOna } from 'app/shared/model/restaurant-ona.model';
import { RestaurantOnaService } from './restaurant-ona.service';
import { RestaurantOnaDeleteDialogComponent } from './restaurant-ona-delete-dialog.component';

@Component({
  selector: 'jhi-restaurant-ona',
  templateUrl: './restaurant-ona.component.html'
})
export class RestaurantOnaComponent implements OnInit, OnDestroy {
  restaurants?: IRestaurantOna[];
  eventSubscriber?: Subscription;

  constructor(
    protected restaurantService: RestaurantOnaService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.restaurantService.query().subscribe((res: HttpResponse<IRestaurantOna[]>) => (this.restaurants = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRestaurants();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRestaurantOna): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRestaurants(): void {
    this.eventSubscriber = this.eventManager.subscribe('restaurantListModification', () => this.loadAll());
  }

  delete(restaurant: IRestaurantOna): void {
    const modalRef = this.modalService.open(RestaurantOnaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.restaurant = restaurant;
  }
}
