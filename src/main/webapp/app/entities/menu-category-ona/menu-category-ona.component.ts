import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMenuCategoryOna } from 'app/shared/model/menu-category-ona.model';
import { MenuCategoryOnaService } from './menu-category-ona.service';
import { MenuCategoryOnaDeleteDialogComponent } from './menu-category-ona-delete-dialog.component';

@Component({
  selector: 'jhi-menu-category-ona',
  templateUrl: './menu-category-ona.component.html'
})
export class MenuCategoryOnaComponent implements OnInit, OnDestroy {
  menuCategories?: IMenuCategoryOna[];
  eventSubscriber?: Subscription;

  constructor(
    protected menuCategoryService: MenuCategoryOnaService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.menuCategoryService.query().subscribe((res: HttpResponse<IMenuCategoryOna[]>) => (this.menuCategories = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMenuCategories();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMenuCategoryOna): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMenuCategories(): void {
    this.eventSubscriber = this.eventManager.subscribe('menuCategoryListModification', () => this.loadAll());
  }

  delete(menuCategory: IMenuCategoryOna): void {
    const modalRef = this.modalService.open(MenuCategoryOnaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.menuCategory = menuCategory;
  }
}
