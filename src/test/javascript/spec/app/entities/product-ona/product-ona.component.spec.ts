import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OrderNowAppTestModule } from '../../../test.module';
import { ProductOnaComponent } from 'app/entities/product-ona/product-ona.component';
import { ProductOnaService } from 'app/entities/product-ona/product-ona.service';
import { ProductOna } from 'app/shared/model/product-ona.model';

describe('Component Tests', () => {
  describe('ProductOna Management Component', () => {
    let comp: ProductOnaComponent;
    let fixture: ComponentFixture<ProductOnaComponent>;
    let service: ProductOnaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrderNowAppTestModule],
        declarations: [ProductOnaComponent]
      })
        .overrideTemplate(ProductOnaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductOnaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductOnaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProductOna(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.products && comp.products[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
