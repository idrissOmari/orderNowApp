import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OrderNowAppTestModule } from '../../../test.module';
import { MenuOnaComponent } from 'app/entities/menu-ona/menu-ona.component';
import { MenuOnaService } from 'app/entities/menu-ona/menu-ona.service';
import { MenuOna } from 'app/shared/model/menu-ona.model';

describe('Component Tests', () => {
  describe('MenuOna Management Component', () => {
    let comp: MenuOnaComponent;
    let fixture: ComponentFixture<MenuOnaComponent>;
    let service: MenuOnaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrderNowAppTestModule],
        declarations: [MenuOnaComponent]
      })
        .overrideTemplate(MenuOnaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MenuOnaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MenuOnaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MenuOna(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.menus && comp.menus[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
