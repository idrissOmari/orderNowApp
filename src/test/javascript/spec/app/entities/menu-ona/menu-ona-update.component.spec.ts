import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { OrderNowAppTestModule } from '../../../test.module';
import { MenuOnaUpdateComponent } from 'app/entities/menu-ona/menu-ona-update.component';
import { MenuOnaService } from 'app/entities/menu-ona/menu-ona.service';
import { MenuOna } from 'app/shared/model/menu-ona.model';

describe('Component Tests', () => {
  describe('MenuOna Management Update Component', () => {
    let comp: MenuOnaUpdateComponent;
    let fixture: ComponentFixture<MenuOnaUpdateComponent>;
    let service: MenuOnaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrderNowAppTestModule],
        declarations: [MenuOnaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MenuOnaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MenuOnaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MenuOnaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MenuOna(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new MenuOna();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
