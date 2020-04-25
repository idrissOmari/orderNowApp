import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OrderNowAppTestModule } from '../../../test.module';
import { RestaurantOnaDetailComponent } from 'app/entities/restaurant-ona/restaurant-ona-detail.component';
import { RestaurantOna } from 'app/shared/model/restaurant-ona.model';

describe('Component Tests', () => {
  describe('RestaurantOna Management Detail Component', () => {
    let comp: RestaurantOnaDetailComponent;
    let fixture: ComponentFixture<RestaurantOnaDetailComponent>;
    const route = ({ data: of({ restaurant: new RestaurantOna(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrderNowAppTestModule],
        declarations: [RestaurantOnaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RestaurantOnaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RestaurantOnaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load restaurant on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.restaurant).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
