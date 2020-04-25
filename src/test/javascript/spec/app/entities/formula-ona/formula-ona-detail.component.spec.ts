import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OrderNowAppTestModule } from '../../../test.module';
import { FormulaOnaDetailComponent } from 'app/entities/formula-ona/formula-ona-detail.component';
import { FormulaOna } from 'app/shared/model/formula-ona.model';

describe('Component Tests', () => {
  describe('FormulaOna Management Detail Component', () => {
    let comp: FormulaOnaDetailComponent;
    let fixture: ComponentFixture<FormulaOnaDetailComponent>;
    const route = ({ data: of({ formula: new FormulaOna(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrderNowAppTestModule],
        declarations: [FormulaOnaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FormulaOnaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FormulaOnaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load formula on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.formula).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
