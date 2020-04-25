import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OrderNowAppTestModule } from '../../../test.module';
import { RestaurantTableOnaComponent } from 'app/entities/restaurant-table-ona/restaurant-table-ona.component';
import { RestaurantTableOnaService } from 'app/entities/restaurant-table-ona/restaurant-table-ona.service';
import { RestaurantTableOna } from 'app/shared/model/restaurant-table-ona.model';

describe('Component Tests', () => {
  describe('RestaurantTableOna Management Component', () => {
    let comp: RestaurantTableOnaComponent;
    let fixture: ComponentFixture<RestaurantTableOnaComponent>;
    let service: RestaurantTableOnaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrderNowAppTestModule],
        declarations: [RestaurantTableOnaComponent]
      })
        .overrideTemplate(RestaurantTableOnaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RestaurantTableOnaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RestaurantTableOnaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RestaurantTableOna(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.restaurantTables && comp.restaurantTables[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
