import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAddressOna } from 'app/shared/model/address-ona.model';
import { AddressOnaService } from './address-ona.service';
import { AddressOnaDeleteDialogComponent } from './address-ona-delete-dialog.component';

@Component({
  selector: 'jhi-address-ona',
  templateUrl: './address-ona.component.html'
})
export class AddressOnaComponent implements OnInit, OnDestroy {
  addresses?: IAddressOna[];
  eventSubscriber?: Subscription;

  constructor(protected addressService: AddressOnaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.addressService.query().subscribe((res: HttpResponse<IAddressOna[]>) => (this.addresses = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAddresses();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAddressOna): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAddresses(): void {
    this.eventSubscriber = this.eventManager.subscribe('addressListModification', () => this.loadAll());
  }

  delete(address: IAddressOna): void {
    const modalRef = this.modalService.open(AddressOnaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.address = address;
  }
}
