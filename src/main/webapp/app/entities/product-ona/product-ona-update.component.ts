import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProductOna, ProductOna } from 'app/shared/model/product-ona.model';
import { ProductOnaService } from './product-ona.service';
import { IMenuCategoryOna } from 'app/shared/model/menu-category-ona.model';
import { MenuCategoryOnaService } from 'app/entities/menu-category-ona/menu-category-ona.service';
import { IFormulaOna } from 'app/shared/model/formula-ona.model';
import { FormulaOnaService } from 'app/entities/formula-ona/formula-ona.service';

type SelectableEntity = IMenuCategoryOna | IFormulaOna;

@Component({
  selector: 'jhi-product-ona-update',
  templateUrl: './product-ona-update.component.html'
})
export class ProductOnaUpdateComponent implements OnInit {
  isSaving = false;
  menucategories: IMenuCategoryOna[] = [];
  formulas: IFormulaOna[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    price: [],
    menuCategoryId: [],
    formulaId: []
  });

  constructor(
    protected productService: ProductOnaService,
    protected menuCategoryService: MenuCategoryOnaService,
    protected formulaService: FormulaOnaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ product }) => {
      this.updateForm(product);

      this.menuCategoryService.query().subscribe((res: HttpResponse<IMenuCategoryOna[]>) => (this.menucategories = res.body || []));

      this.formulaService.query().subscribe((res: HttpResponse<IFormulaOna[]>) => (this.formulas = res.body || []));
    });
  }

  updateForm(product: IProductOna): void {
    this.editForm.patchValue({
      id: product.id,
      name: product.name,
      price: product.price,
      menuCategoryId: product.menuCategoryId,
      formulaId: product.formulaId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const product = this.createFromForm();
    if (product.id !== undefined) {
      this.subscribeToSaveResponse(this.productService.update(product));
    } else {
      this.subscribeToSaveResponse(this.productService.create(product));
    }
  }

  private createFromForm(): IProductOna {
    return {
      ...new ProductOna(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      price: this.editForm.get(['price'])!.value,
      menuCategoryId: this.editForm.get(['menuCategoryId'])!.value,
      formulaId: this.editForm.get(['formulaId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductOna>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
