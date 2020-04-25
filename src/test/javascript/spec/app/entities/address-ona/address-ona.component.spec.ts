import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OrderNowAppTestModule } from '../../../test.module';
import { AddressOnaComponent } from 'app/entities/address-ona/address-ona.component';
import { AddressOnaService } from 'app/entities/address-ona/address-ona.service';
import { AddressOna } from 'app/shared/model/address-ona.model';

describe('Component Tests', () => {
  describe('AddressOna Management Component', () => {
    let comp: AddressOnaComponent;
    let fixture: ComponentFixture<AddressOnaComponent>;
    let service: AddressOnaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrderNowAppTestModule],
        declarations: [AddressOnaComponent]
      })
        .overrideTemplate(AddressOnaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AddressOnaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AddressOnaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AddressOna(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.addresses && comp.addresses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
