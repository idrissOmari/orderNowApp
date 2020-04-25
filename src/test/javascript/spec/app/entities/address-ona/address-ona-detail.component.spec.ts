import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OrderNowAppTestModule } from '../../../test.module';
import { AddressOnaDetailComponent } from 'app/entities/address-ona/address-ona-detail.component';
import { AddressOna } from 'app/shared/model/address-ona.model';

describe('Component Tests', () => {
  describe('AddressOna Management Detail Component', () => {
    let comp: AddressOnaDetailComponent;
    let fixture: ComponentFixture<AddressOnaDetailComponent>;
    const route = ({ data: of({ address: new AddressOna(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrderNowAppTestModule],
        declarations: [AddressOnaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AddressOnaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AddressOnaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load address on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.address).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
