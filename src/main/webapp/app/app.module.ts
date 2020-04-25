import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { OrderNowAppSharedModule } from 'app/shared/shared.module';
import { OrderNowAppCoreModule } from 'app/core/core.module';
import { OrderNowAppAppRoutingModule } from './app-routing.module';
import { OrderNowAppHomeModule } from './home/home.module';
import { OrderNowAppEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    OrderNowAppSharedModule,
    OrderNowAppCoreModule,
    OrderNowAppHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    OrderNowAppEntityModule,
    OrderNowAppAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent]
})
export class OrderNowAppAppModule {}
