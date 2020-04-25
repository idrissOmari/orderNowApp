import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { OrderNowAppTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { MenuCategoryOnaDeleteDialogComponent } from 'app/entities/menu-category-ona/menu-category-ona-delete-dialog.component';
import { MenuCategoryOnaService } from 'app/entities/menu-category-ona/menu-category-ona.service';

describe('Component Tests', () => {
  describe('MenuCategoryOna Management Delete Component', () => {
    let comp: MenuCategoryOnaDeleteDialogComponent;
    let fixture: ComponentFixture<MenuCategoryOnaDeleteDialogComponent>;
    let service: MenuCategoryOnaService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrderNowAppTestModule],
        declarations: [MenuCategoryOnaDeleteDialogComponent]
      })
        .overrideTemplate(MenuCategoryOnaDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MenuCategoryOnaDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MenuCategoryOnaService);
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
