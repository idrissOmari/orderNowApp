import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFormulaOrderOna } from 'app/shared/model/formula-order-ona.model';

@Component({
  selector: 'jhi-formula-order-ona-detail',
  templateUrl: './formula-order-ona-detail.component.html'
})
export class FormulaOrderOnaDetailComponent implements OnInit {
  formulaOrder: IFormulaOrderOna | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ formulaOrder }) => (this.formulaOrder = formulaOrder));
  }

  previousState(): void {
    window.history.back();
  }
}
