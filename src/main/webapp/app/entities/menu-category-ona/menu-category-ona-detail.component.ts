import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMenuCategoryOna } from 'app/shared/model/menu-category-ona.model';

@Component({
  selector: 'jhi-menu-category-ona-detail',
  templateUrl: './menu-category-ona-detail.component.html'
})
export class MenuCategoryOnaDetailComponent implements OnInit {
  menuCategory: IMenuCategoryOna | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ menuCategory }) => (this.menuCategory = menuCategory));
  }

  previousState(): void {
    window.history.back();
  }
}
