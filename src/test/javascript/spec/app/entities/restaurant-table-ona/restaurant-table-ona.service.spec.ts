import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RestaurantTableOnaService } from 'app/entities/restaurant-table-ona/restaurant-table-ona.service';
import { IRestaurantTableOna, RestaurantTableOna } from 'app/shared/model/restaurant-table-ona.model';
import { TableStatus } from 'app/shared/model/enumerations/table-status.model';

describe('Service Tests', () => {
  describe('RestaurantTableOna Service', () => {
    let injector: TestBed;
    let service: RestaurantTableOnaService;
    let httpMock: HttpTestingController;
    let elemDefault: IRestaurantTableOna;
    let expectedResult: IRestaurantTableOna | IRestaurantTableOna[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(RestaurantTableOnaService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new RestaurantTableOna(0, 0, TableStatus.OPEN);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a RestaurantTableOna', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new RestaurantTableOna()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a RestaurantTableOna', () => {
        const returnedFromService = Object.assign(
          {
            tNumber: 1,
            tStatus: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of RestaurantTableOna', () => {
        const returnedFromService = Object.assign(
          {
            tNumber: 1,
            tStatus: 'BBBBBB'
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

      it('should delete a RestaurantTableOna', () => {
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
