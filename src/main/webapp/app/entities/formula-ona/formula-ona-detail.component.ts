import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFormulaOna } from 'app/shared/model/formula-ona.model';

@Component({
  selector: 'jhi-formula-ona-detail',
  templateUrl: './formula-ona-detail.component.html'
})
export class FormulaOnaDetailComponent implements OnInit {
  formula: IFormulaOna | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ formula }) => (this.formula = formula));
  }

  previousState(): void {
    window.history.back();
  }
}
