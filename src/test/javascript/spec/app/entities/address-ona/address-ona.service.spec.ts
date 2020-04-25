import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AddressOnaService } from 'app/entities/address-ona/address-ona.service';
import { IAddressOna, AddressOna } from 'app/shared/model/address-ona.model';

describe('Service Tests', () => {
  describe('AddressOna Service', () => {
    let injector: TestBed;
    let service: AddressOnaService;
    let httpMock: HttpTestingController;
    let elemDefault: IAddressOna;
    let expectedResult: IAddressOna | IAddressOna[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(AddressOnaService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new AddressOna(0, 'AAAAAAA', 'AAAAAAA', 0, 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a AddressOna', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new AddressOna()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a AddressOna', () => {
        const returnedFromService = Object.assign(
          {
            adresse1: 'BBBBBB',
            adresse2: 'BBBBBB',
            postalCode: 1,
            city: 'BBBBBB',
            country: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of AddressOna', () => {
        const returnedFromService = Object.assign(
          {
            adresse1: 'BBBBBB',
            adresse2: 'BBBBBB',
            postalCode: 1,
            city: 'BBBBBB',
            country: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a AddressOna', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
