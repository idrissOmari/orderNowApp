import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OrderNowAppTestModule } from '../../../test.module';
import { FormulaOrderOnaComponent } from 'app/entities/formula-order-ona/formula-order-ona.component';
import { FormulaOrderOnaService } from 'app/entities/formula-order-ona/formula-order-ona.service';
import { FormulaOrderOna } from 'app/shared/model/formula-order-ona.model';

describe('Component Tests', () => {
  describe('FormulaOrderOna Management Component', () => {
    let comp: FormulaOrderOnaComponent;
    let fixture: ComponentFixture<FormulaOrderOnaComponent>;
    let service: FormulaOrderOnaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrderNowAppTestModule],
        declarations: [FormulaOrderOnaComponent]
      })
        .overrideTemplate(FormulaOrderOnaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FormulaOrderOnaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FormulaOrderOnaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new FormulaOrderOna(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.formulaOrders && comp.formulaOrders[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
