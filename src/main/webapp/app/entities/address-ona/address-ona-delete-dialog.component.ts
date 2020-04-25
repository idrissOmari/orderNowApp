import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAddressOna } from 'app/shared/model/address-ona.model';
import { AddressOnaService } from './address-ona.service';

@Component({
  templateUrl: './address-ona-delete-dialog.component.html'
})
export class AddressOnaDeleteDialogComponent {
  address?: IAddressOna;

  constructor(protected addressService: AddressOnaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.addressService.delete(id).subscribe(() => {
      this.eventManager.broadcast('addressListModification');
      this.activeModal.close();
    });
  }
}
