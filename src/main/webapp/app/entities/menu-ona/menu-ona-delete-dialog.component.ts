import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMenuOna } from 'app/shared/model/menu-ona.model';
import { MenuOnaService } from './menu-ona.service';

@Component({
  templateUrl: './menu-ona-delete-dialog.component.html'
})
export class MenuOnaDeleteDialogComponent {
  menu?: IMenuOna;

  constructor(protected menuService: MenuOnaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.menuService.delete(id).subscribe(() => {
      this.eventManager.broadcast('menuListModification');
      this.activeModal.close();
    });
  }
}
