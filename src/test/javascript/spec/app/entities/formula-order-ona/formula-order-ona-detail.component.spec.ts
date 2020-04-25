import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OrderNowAppTestModule } from '../../../test.module';
import { FormulaOrderOnaDetailComponent } from 'app/entities/formula-order-ona/formula-order-ona-detail.component';
import { FormulaOrderOna } from 'app/shared/model/formula-order-ona.model';

describe('Component Tests', () => {
  describe('FormulaOrderOna Management Detail Component', () => {
    let comp: FormulaOrderOnaDetailComponent;
    let fixture: ComponentFixture<FormulaOrderOnaDetailComponent>;
    const route = ({ data: of({ formulaOrder: new FormulaOrderOna(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrderNowAppTestModule],
        declarations: [FormulaOrderOnaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FormulaOrderOnaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FormulaOrderOnaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load formulaOrder on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.formulaOrder).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
