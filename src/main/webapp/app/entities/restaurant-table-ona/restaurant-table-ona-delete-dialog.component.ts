import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRestaurantTableOna } from 'app/shared/model/restaurant-table-ona.model';
import { RestaurantTableOnaService } from './restaurant-table-ona.service';

@Component({
  templateUrl: './restaurant-table-ona-delete-dialog.component.html'
})
export class RestaurantTableOnaDeleteDialogComponent {
  restaurantTable?: IRestaurantTableOna;

  constructor(
    protected restaurantTableService: RestaurantTableOnaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.restaurantTableService.delete(id).subscribe(() => {
      this.eventManager.broadcast('restaurantTableListModification');
      this.activeModal.close();
    });
  }
}
