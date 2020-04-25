import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RestaurantOnaService } from 'app/entities/restaurant-ona/restaurant-ona.service';
import { IRestaurantOna, RestaurantOna } from 'app/shared/model/restaurant-ona.model';

describe('Service Tests', () => {
  describe('RestaurantOna Service', () => {
    let injector: TestBed;
    let service: RestaurantOnaService;
    let httpMock: HttpTestingController;
    let elemDefault: IRestaurantOna;
    let expectedResult: IRestaurantOna | IRestaurantOna[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(RestaurantOnaService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new RestaurantOna(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a RestaurantOna', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new RestaurantOna()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a RestaurantOna', () => {
        const returnedFromService = Object.assign(
          {
            nom: 'BBBBBB',
            tel: 'BBBBBB',
            email: 'BBBBBB',
            description: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of RestaurantOna', () => {
        const returnedFromService = Object.assign(
          {
            nom: 'BBBBBB',
            tel: 'BBBBBB',
            email: 'BBBBBB',
            description: 'BBBBBB'
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

      it('should delete a RestaurantOna', () => {
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
