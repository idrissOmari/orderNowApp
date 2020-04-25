import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { OrderNowAppTestModule } from '../../../test.module';
import { ProductOnaUpdateComponent } from 'app/entities/product-ona/product-ona-update.component';
import { ProductOnaService } from 'app/entities/product-ona/product-ona.service';
import { ProductOna } from 'app/shared/model/product-ona.model';

describe('Component Tests', () => {
  describe('ProductOna Management Update Component', () => {
    let comp: ProductOnaUpdateComponent;
    let fixture: ComponentFixture<ProductOnaUpdateComponent>;
    let service: ProductOnaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrderNowAppTestModule],
        declarations: [ProductOnaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProductOnaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductOnaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductOnaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProductOna(123);
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
        const entity = new ProductOna();
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
