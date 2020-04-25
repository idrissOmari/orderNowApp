import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { OrderNowAppTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { RestaurantTableOnaDeleteDialogComponent } from 'app/entities/restaurant-table-ona/restaurant-table-ona-delete-dialog.component';
import { RestaurantTableOnaService } from 'app/entities/restaurant-table-ona/restaurant-table-ona.service';

describe('Component Tests', () => {
  describe('RestaurantTableOna Management Delete Component', () => {
    let comp: RestaurantTableOnaDeleteDialogComponent;
    let fixture: ComponentFixture<RestaurantTableOnaDeleteDialogComponent>;
    let service: RestaurantTableOnaService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrderNowAppTestModule],
        declarations: [RestaurantTableOnaDeleteDialogComponent]
      })
        .overrideTemplate(RestaurantTableOnaDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RestaurantTableOnaDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RestaurantTableOnaService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
