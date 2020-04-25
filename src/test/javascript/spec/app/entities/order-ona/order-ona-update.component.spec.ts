import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { OrderNowAppTestModule } from '../../../test.module';
import { OrderOnaUpdateComponent } from 'app/entities/order-ona/order-ona-update.component';
import { OrderOnaService } from 'app/entities/order-ona/order-ona.service';
import { OrderOna } from 'app/shared/model/order-ona.model';

describe('Component Tests', () => {
  describe('OrderOna Management Update Component', () => {
    let comp: OrderOnaUpdateComponent;
    let fixture: ComponentFixture<OrderOnaUpdateComponent>;
    let service: OrderOnaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrderNowAppTestModule],
        declarations: [OrderOnaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(OrderOnaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrderOnaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrderOnaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OrderOna(123);
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
        const entity = new OrderOna();
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
