import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMenuOna } from 'app/shared/model/menu-ona.model';

@Component({
  selector: 'jhi-menu-ona-detail',
  templateUrl: './menu-ona-detail.component.html'
})
export class MenuOnaDetailComponent implements OnInit {
  menu: IMenuOna | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ menu }) => (this.menu = menu));
  }

  previousState(): void {
    window.history.back();
  }
}
