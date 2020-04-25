import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OrderNowAppTestModule } from '../../../test.module';
import { OrderOnaDetailComponent } from 'app/entities/order-ona/order-ona-detail.component';
import { OrderOna } from 'app/shared/model/order-ona.model';

describe('Component Tests', () => {
  describe('OrderOna Management Detail Component', () => {
    let comp: OrderOnaDetailComponent;
    let fixture: ComponentFixture<OrderOnaDetailComponent>;
    const route = ({ data: of({ order: new OrderOna(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrderNowAppTestModule],
        declarations: [OrderOnaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(OrderOnaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrderOnaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load order on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.order).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
