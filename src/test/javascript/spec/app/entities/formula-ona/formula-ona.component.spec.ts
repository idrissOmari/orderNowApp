import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OrderNowAppTestModule } from '../../../test.module';
import { FormulaOnaComponent } from 'app/entities/formula-ona/formula-ona.component';
import { FormulaOnaService } from 'app/entities/formula-ona/formula-ona.service';
import { FormulaOna } from 'app/shared/model/formula-ona.model';

describe('Component Tests', () => {
  describe('FormulaOna Management Component', () => {
    let comp: FormulaOnaComponent;
    let fixture: ComponentFixture<FormulaOnaComponent>;
    let service: FormulaOnaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrderNowAppTestModule],
        declarations: [FormulaOnaComponent]
      })
        .overrideTemplate(FormulaOnaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FormulaOnaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FormulaOnaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new FormulaOna(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.formulas && comp.formulas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
