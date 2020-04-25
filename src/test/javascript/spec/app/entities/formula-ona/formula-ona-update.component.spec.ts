import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { OrderNowAppTestModule } from '../../../test.module';
import { FormulaOnaUpdateComponent } from 'app/entities/formula-ona/formula-ona-update.component';
import { FormulaOnaService } from 'app/entities/formula-ona/formula-ona.service';
import { FormulaOna } from 'app/shared/model/formula-ona.model';

describe('Component Tests', () => {
  describe('FormulaOna Management Update Component', () => {
    let comp: FormulaOnaUpdateComponent;
    let fixture: ComponentFixture<FormulaOnaUpdateComponent>;
    let service: FormulaOnaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrderNowAppTestModule],
        declarations: [FormulaOnaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FormulaOnaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FormulaOnaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FormulaOnaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new FormulaOna(123);
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
        const entity = new FormulaOna();
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
