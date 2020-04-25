import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OrderNowAppTestModule } from '../../../test.module';
import { MenuCategoryOnaDetailComponent } from 'app/entities/menu-category-ona/menu-category-ona-detail.component';
import { MenuCategoryOna } from 'app/shared/model/menu-category-ona.model';

describe('Component Tests', () => {
  describe('MenuCategoryOna Management Detail Component', () => {
    let comp: MenuCategoryOnaDetailComponent;
    let fixture: ComponentFixture<MenuCategoryOnaDetailComponent>;
    const route = ({ data: of({ menuCategory: new MenuCategoryOna(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrderNowAppTestModule],
        declarations: [MenuCategoryOnaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MenuCategoryOnaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MenuCategoryOnaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load menuCategory on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.menuCategory).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
