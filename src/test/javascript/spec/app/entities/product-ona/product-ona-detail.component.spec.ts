import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OrderNowAppTestModule } from '../../../test.module';
import { ProductOnaDetailComponent } from 'app/entities/product-ona/product-ona-detail.component';
import { ProductOna } from 'app/shared/model/product-ona.model';

describe('Component Tests', () => {
  describe('ProductOna Management Detail Component', () => {
    let comp: ProductOnaDetailComponent;
    let fixture: ComponentFixture<ProductOnaDetailComponent>;
    const route = ({ data: of({ product: new ProductOna(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrderNowAppTestModule],
        declarations: [ProductOnaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProductOnaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductOnaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load product on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.product).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
