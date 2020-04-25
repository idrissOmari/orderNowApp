import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { OrderNowAppTestModule } from '../../../test.module';
import { AddressOnaUpdateComponent } from 'app/entities/address-ona/address-ona-update.component';
import { AddressOnaService } from 'app/entities/address-ona/address-ona.service';
import { AddressOna } from 'app/shared/model/address-ona.model';

describe('Component Tests', () => {
  describe('AddressOna Management Update Component', () => {
    let comp: AddressOnaUpdateComponent;
    let fixture: ComponentFixture<AddressOnaUpdateComponent>;
    let service: AddressOnaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrderNowAppTestModule],
        declarations: [AddressOnaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AddressOnaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AddressOnaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AddressOnaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AddressOna(123);
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
        const entity = new AddressOna();
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
