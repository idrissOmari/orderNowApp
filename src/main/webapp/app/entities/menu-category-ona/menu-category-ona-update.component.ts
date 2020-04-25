import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IMenuCategoryOna, MenuCategoryOna } from 'app/shared/model/menu-category-ona.model';
import { MenuCategoryOnaService } from './menu-category-ona.service';
import { IMenuOna } from 'app/shared/model/menu-ona.model';
import { MenuOnaService } from 'app/entities/menu-ona/menu-ona.service';

@Component({
  selector: 'jhi-menu-category-ona-update',
  templateUrl: './menu-category-ona-update.component.html'
})
export class MenuCategoryOnaUpdateComponent implements OnInit {
  isSaving = false;
  menus: IMenuOna[] = [];

  editForm = this.fb.group({
    id: [],
    label: [],
    menuId: []
  });

  constructor(
    protected menuCategoryService: MenuCategoryOnaService,
    protected menuService: MenuOnaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ menuCategory }) => {
      this.updateForm(menuCategory);

      this.menuService.query().subscribe((res: HttpResponse<IMenuOna[]>) => (this.menus = res.body || []));
    });
  }

  updateForm(menuCategory: IMenuCategoryOna): void {
    this.editForm.patchValue({
      id: menuCategory.id,
      label: menuCategory.label,
      menuId: menuCategory.menuId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const menuCategory = this.createFromForm();
    if (menuCategory.id !== undefined) {
      this.subscribeToSaveResponse(this.menuCategoryService.update(menuCategory));
    } else {
      this.subscribeToSaveResponse(this.menuCategoryService.create(menuCategory));
    }
  }

  private createFromForm(): IMenuCategoryOna {
    return {
      ...new MenuCategoryOna(),
      id: this.editForm.get(['id'])!.value,
      label: this.editForm.get(['label'])!.value,
      menuId: this.editForm.get(['menuId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMenuCategoryOna>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IMenuOna): any {
    return item.id;
  }
}
