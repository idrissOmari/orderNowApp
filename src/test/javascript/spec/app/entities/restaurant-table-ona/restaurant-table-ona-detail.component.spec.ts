import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OrderNowAppTestModule } from '../../../test.module';
import { RestaurantTableOnaDetailComponent } from 'app/entities/restaurant-table-ona/restaurant-table-ona-detail.component';
import { RestaurantTableOna } from 'app/shared/model/restaurant-table-ona.model';

describe('Component Tests', () => {
  describe('RestaurantTableOna Management Detail Component', () => {
    let comp: RestaurantTableOnaDetailComponent;
    let fixture: ComponentFixture<RestaurantTableOnaDetailComponent>;
    const route = ({ data: of({ restaurantTable: new RestaurantTableOna(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrderNowAppTestModule],
        declarations: [RestaurantTableOnaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RestaurantTableOnaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RestaurantTableOnaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load restaurantTable on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.restaurantTable).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
