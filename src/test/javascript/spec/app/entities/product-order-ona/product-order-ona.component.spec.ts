import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OrderNowAppTestModule } from '../../../test.module';
import { ProductOrderOnaComponent } from 'app/entities/product-order-ona/product-order-ona.component';
import { ProductOrderOnaService } from 'app/entities/product-order-ona/product-order-ona.service';
import { ProductOrderOna } from 'app/shared/model/product-order-ona.model';

describe('Component Tests', () => {
  describe('ProductOrderOna Management Component', () => {
    let comp: ProductOrderOnaComponent;
    let fixture: ComponentFixture<ProductOrderOnaComponent>;
    let service: ProductOrderOnaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrderNowAppTestModule],
        declarations: [ProductOrderOnaComponent]
      })
        .overrideTemplate(ProductOrderOnaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductOrderOnaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductOrderOnaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProductOrderOna(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.productOrders && comp.productOrders[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
