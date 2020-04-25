import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OrderNowAppTestModule } from '../../../test.module';
import { ProductOrderOnaDetailComponent } from 'app/entities/product-order-ona/product-order-ona-detail.component';
import { ProductOrderOna } from 'app/shared/model/product-order-ona.model';

describe('Component Tests', () => {
  describe('ProductOrderOna Management Detail Component', () => {
    let comp: ProductOrderOnaDetailComponent;
    let fixture: ComponentFixture<ProductOrderOnaDetailComponent>;
    const route = ({ data: of({ productOrder: new ProductOrderOna(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrderNowAppTestModule],
        declarations: [ProductOrderOnaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProductOrderOnaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductOrderOnaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load productOrder on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.productOrder).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
