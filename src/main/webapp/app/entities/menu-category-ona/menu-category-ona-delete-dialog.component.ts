import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMenuCategoryOna } from 'app/shared/model/menu-category-ona.model';
import { MenuCategoryOnaService } from './menu-category-ona.service';

@Component({
  templateUrl: './menu-category-ona-delete-dialog.component.html'
})
export class MenuCategoryOnaDeleteDialogComponent {
  menuCategory?: IMenuCategoryOna;

  constructor(
    protected menuCategoryService: MenuCategoryOnaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.menuCategoryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('menuCategoryListModification');
      this.activeModal.close();
    });
  }
}
