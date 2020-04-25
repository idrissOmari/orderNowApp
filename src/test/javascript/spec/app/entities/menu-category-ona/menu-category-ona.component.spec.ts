import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OrderNowAppTestModule } from '../../../test.module';
import { MenuCategoryOnaComponent } from 'app/entities/menu-category-ona/menu-category-ona.component';
import { MenuCategoryOnaService } from 'app/entities/menu-category-ona/menu-category-ona.service';
import { MenuCategoryOna } from 'app/shared/model/menu-category-ona.model';

describe('Component Tests', () => {
  describe('MenuCategoryOna Management Component', () => {
    let comp: MenuCategoryOnaComponent;
    let fixture: ComponentFixture<MenuCategoryOnaComponent>;
    let service: MenuCategoryOnaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrderNowAppTestModule],
        declarations: [MenuCategoryOnaComponent]
      })
        .overrideTemplate(MenuCategoryOnaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MenuCategoryOnaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MenuCategoryOnaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MenuCategoryOna(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.menuCategories && comp.menuCategories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
