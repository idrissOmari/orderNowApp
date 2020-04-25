import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { OrderNowAppTestModule } from '../../../test.module';
import { MenuCategoryOnaUpdateComponent } from 'app/entities/menu-category-ona/menu-category-ona-update.component';
import { MenuCategoryOnaService } from 'app/entities/menu-category-ona/menu-category-ona.service';
import { MenuCategoryOna } from 'app/shared/model/menu-category-ona.model';

describe('Component Tests', () => {
  describe('MenuCategoryOna Management Update Component', () => {
    let comp: MenuCategoryOnaUpdateComponent;
    let fixture: ComponentFixture<MenuCategoryOnaUpdateComponent>;
    let service: MenuCategoryOnaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrderNowAppTestModule],
        declarations: [MenuCategoryOnaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MenuCategoryOnaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MenuCategoryOnaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MenuCategoryOnaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MenuCategoryOna(123);
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
        const entity = new MenuCategoryOna();
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
