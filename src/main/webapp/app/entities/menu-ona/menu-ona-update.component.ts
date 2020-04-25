import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IMenuOna, MenuOna } from 'app/shared/model/menu-ona.model';
import { MenuOnaService } from './menu-ona.service';
import { IRestaurantOna } from 'app/shared/model/restaurant-ona.model';
import { RestaurantOnaService } from 'app/entities/restaurant-ona/restaurant-ona.service';

@Component({
  selector: 'jhi-menu-ona-update',
  templateUrl: './menu-ona-update.component.html'
})
export class MenuOnaUpdateComponent implements OnInit {
  isSaving = false;
  restaurants: IRestaurantOna[] = [];

  editForm = this.fb.group({
    id: [],
    tittle: [],
    restaurantId: []
  });

  constructor(
    protected menuService: MenuOnaService,
    protected restaurantService: RestaurantOnaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ menu }) => {
      this.updateForm(menu);

      this.restaurantService.query().subscribe((res: HttpResponse<IRestaurantOna[]>) => (this.restaurants = res.body || []));
    });
  }

  updateForm(menu: IMenuOna): void {
    this.editForm.patchValue({
      id: menu.id,
      tittle: menu.tittle,
      restaurantId: menu.restaurantId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const menu = this.createFromForm();
    if (menu.id !== undefined) {
      this.subscribeToSaveResponse(this.menuService.update(menu));
    } else {
      this.subscribeToSaveResponse(this.menuService.create(menu));
    }
  }

  private createFromForm(): IMenuOna {
    return {
      ...new MenuOna(),
      id: this.editForm.get(['id'])!.value,
      tittle: this.editForm.get(['tittle'])!.value,
      restaurantId: this.editForm.get(['restaurantId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMenuOna>>): void {
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

  trackById(index: number, item: IRestaurantOna): any {
    return item.id;
  }
}
