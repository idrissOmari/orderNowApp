import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { OrderNowAppTestModule } from '../../../test.module';
import { ProductOrderOnaUpdateComponent } from 'app/entities/product-order-ona/product-order-ona-update.component';
import { ProductOrderOnaService } from 'app/entities/product-order-ona/product-order-ona.service';
import { ProductOrderOna } from 'app/shared/model/product-order-ona.model';

describe('Component Tests', () => {
  describe('ProductOrderOna Management Update Component', () => {
    let comp: ProductOrderOnaUpdateComponent;
    let fixture: ComponentFixture<ProductOrderOnaUpdateComponent>;
    let service: ProductOrderOnaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrderNowAppTestModule],
        declarations: [ProductOrderOnaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProductOrderOnaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductOrderOnaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductOrderOnaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProductOrderOna(123);
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
        const entity = new ProductOrderOna();
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
