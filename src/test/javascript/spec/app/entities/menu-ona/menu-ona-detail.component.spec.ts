import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OrderNowAppTestModule } from '../../../test.module';
import { MenuOnaDetailComponent } from 'app/entities/menu-ona/menu-ona-detail.component';
import { MenuOna } from 'app/shared/model/menu-ona.model';

describe('Component Tests', () => {
  describe('MenuOna Management Detail Component', () => {
    let comp: MenuOnaDetailComponent;
    let fixture: ComponentFixture<MenuOnaDetailComponent>;
    const route = ({ data: of({ menu: new MenuOna(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrderNowAppTestModule],
        declarations: [MenuOnaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MenuOnaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MenuOnaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load menu on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.menu).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
