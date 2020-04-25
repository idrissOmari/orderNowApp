import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFormulaOna, FormulaOna } from 'app/shared/model/formula-ona.model';
import { FormulaOnaService } from './formula-ona.service';
import { IMenuOna } from 'app/shared/model/menu-ona.model';
import { MenuOnaService } from 'app/entities/menu-ona/menu-ona.service';

@Component({
  selector: 'jhi-formula-ona-update',
  templateUrl: './formula-ona-update.component.html'
})
export class FormulaOnaUpdateComponent implements OnInit {
  isSaving = false;
  menus: IMenuOna[] = [];

  editForm = this.fb.group({
    id: [],
    label: [],
    price: [],
    menuId: []
  });

  constructor(
    protected formulaService: FormulaOnaService,
    protected menuService: MenuOnaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ formula }) => {
      this.updateForm(formula);

      this.menuService.query().subscribe((res: HttpResponse<IMenuOna[]>) => (this.menus = res.body || []));
    });
  }

  updateForm(formula: IFormulaOna): void {
    this.editForm.patchValue({
      id: formula.id,
      label: formula.label,
      price: formula.price,
      menuId: formula.menuId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const formula = this.createFromForm();
    if (formula.id !== undefined) {
      this.subscribeToSaveResponse(this.formulaService.update(formula));
    } else {
      this.subscribeToSaveResponse(this.formulaService.create(formula));
    }
  }

  private createFromForm(): IFormulaOna {
    return {
      ...new FormulaOna(),
      id: this.editForm.get(['id'])!.value,
      label: this.editForm.get(['label'])!.value,
      price: this.editForm.get(['price'])!.value,
      menuId: this.editForm.get(['menuId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFormulaOna>>): void {
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
