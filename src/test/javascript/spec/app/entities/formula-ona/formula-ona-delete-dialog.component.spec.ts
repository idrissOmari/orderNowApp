import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { OrderNowAppTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { FormulaOnaDeleteDialogComponent } from 'app/entities/formula-ona/formula-ona-delete-dialog.component';
import { FormulaOnaService } from 'app/entities/formula-ona/formula-ona.service';

describe('Component Tests', () => {
  describe('FormulaOna Management Delete Component', () => {
    let comp: FormulaOnaDeleteDialogComponent;
    let fixture: ComponentFixture<FormulaOnaDeleteDialogComponent>;
    let service: FormulaOnaService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrderNowAppTestModule],
        declarations: [FormulaOnaDeleteDialogComponent]
      })
        .overrideTemplate(FormulaOnaDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FormulaOnaDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FormulaOnaService);
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
