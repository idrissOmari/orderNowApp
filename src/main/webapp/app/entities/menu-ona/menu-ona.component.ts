import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMenuOna } from 'app/shared/model/menu-ona.model';
import { MenuOnaService } from './menu-ona.service';
import { MenuOnaDeleteDialogComponent } from './menu-ona-delete-dialog.component';

@Component({
  selector: 'jhi-menu-ona',
  templateUrl: './menu-ona.component.html'
})
export class MenuOnaComponent implements OnInit, OnDestroy {
  menus?: IMenuOna[];
  eventSubscriber?: Subscription;

  constructor(protected menuService: MenuOnaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.menuService.query().subscribe((res: HttpResponse<IMenuOna[]>) => (this.menus = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMenus();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMenuOna): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMenus(): void {
    this.eventSubscriber = this.eventManager.subscribe('menuListModification', () => this.loadAll());
  }

  delete(menu: IMenuOna): void {
    const modalRef = this.modalService.open(MenuOnaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.menu = menu;
  }
}
