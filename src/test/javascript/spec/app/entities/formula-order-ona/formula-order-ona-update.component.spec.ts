import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { OrderNowAppTestModule } from '../../../test.module';
import { FormulaOrderOnaUpdateComponent } from 'app/entities/formula-order-ona/formula-order-ona-update.component';
import { FormulaOrderOnaService } from 'app/entities/formula-order-ona/formula-order-ona.service';
import { FormulaOrderOna } from 'app/shared/model/formula-order-ona.model';

describe('Component Tests', () => {
  describe('FormulaOrderOna Management Update Component', () => {
    let comp: FormulaOrderOnaUpdateComponent;
    let fixture: ComponentFixture<FormulaOrderOnaUpdateComponent>;
    let service: FormulaOrderOnaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrderNowAppTestModule],
        declarations: [FormulaOrderOnaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FormulaOrderOnaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FormulaOrderOnaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FormulaOrderOnaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new FormulaOrderOna(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new FormulaOrderOna();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
