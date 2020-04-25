import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRestaurantOna } from 'app/shared/model/restaurant-ona.model';
import { RestaurantOnaService } from './restaurant-ona.service';

@Component({
  templateUrl: './restaurant-ona-delete-dialog.component.html'
})
export class RestaurantOnaDeleteDialogComponent {
  restaurant?: IRestaurantOna;

  constructor(
    protected restaurantService: RestaurantOnaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.restaurantService.delete(id).subscribe(() => {
      this.eventManager.broadcast('restaurantListModification');
      this.activeModal.close();
    });
  }
}
