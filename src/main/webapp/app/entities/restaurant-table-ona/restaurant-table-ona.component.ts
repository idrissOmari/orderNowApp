import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRestaurantTableOna } from 'app/shared/model/restaurant-table-ona.model';
import { RestaurantTableOnaService } from './restaurant-table-ona.service';
import { RestaurantTableOnaDeleteDialogComponent } from './restaurant-table-ona-delete-dialog.component';

@Component({
  selector: 'jhi-restaurant-table-ona',
  templateUrl: './restaurant-table-ona.component.html'
})
export class RestaurantTableOnaComponent implements OnInit, OnDestroy {
  restaurantTables?: IRestaurantTableOna[];
  eventSubscriber?: Subscription;

  constructor(
    protected restaurantTableService: RestaurantTableOnaService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.restaurantTableService.query().subscribe((res: HttpResponse<IRestaurantTableOna[]>) => (this.restaurantTables = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRestaurantTables();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRestaurantTableOna): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRestaurantTables(): void {
    this.eventSubscriber = this.eventManager.subscribe('restaurantTableListModification', () => this.loadAll());
  }

  delete(restaurantTable: IRestaurantTableOna): void {
    const modalRef = this.modalService.open(RestaurantTableOnaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.restaurantTable = restaurantTable;
  }
}
