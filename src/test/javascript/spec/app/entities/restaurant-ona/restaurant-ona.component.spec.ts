import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OrderNowAppTestModule } from '../../../test.module';
import { RestaurantOnaComponent } from 'app/entities/restaurant-ona/restaurant-ona.component';
import { RestaurantOnaService } from 'app/entities/restaurant-ona/restaurant-ona.service';
import { RestaurantOna } from 'app/shared/model/restaurant-ona.model';

describe('Component Tests', () => {
  describe('RestaurantOna Management Component', () => {
    let comp: RestaurantOnaComponent;
    let fixture: ComponentFixture<RestaurantOnaComponent>;
    let service: RestaurantOnaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrderNowAppTestModule],
        declarations: [RestaurantOnaComponent]
      })
        .overrideTemplate(RestaurantOnaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RestaurantOnaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RestaurantOnaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RestaurantOna(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.restaurants && comp.restaurants[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
