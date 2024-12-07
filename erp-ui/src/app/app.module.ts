import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChangePasswordComponent } from './authentication/change-password/change-password.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { LoginComponent } from './authentication/login/login.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { MainmenuComponent } from './layout/mainmenu/mainmenu.component';
import { MenuComponent } from './layout/menu/menu.component';
import { RouterModule } from '@angular/router';
import { AppRoutes, routes } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengMaterialUiModule } from './shared/primeng.material.module';
import { MessageService } from 'primeng/api';
// import { TransactionsComponent } from './transcations/transactions/transactions.component';
// i18n translater
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HTTP_INTERCEPTORS, HttpClient,HttpClientModule } from '@angular/common/http';
export function httpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}
import { CommonFunctionsService } from './shared/commonfunction.service';
import { CommonHttpService } from './shared/common-http.service';
import { ErpInterceptor } from './shared/erpInterceptor';
import { EncryptDecryptService } from './shared/encrypt-decrypt.service';
import { CommonComponent } from './shared/common.component';
import { AuthenticationService } from './authentication/service/authentication.service';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { OrganizationChartModule } from 'primeng/organizationchart';
//spinner
import { NgxSpinnerModule } from 'ngx-spinner';
// Scroller
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SpeedDialModule } from 'primeng/speeddial';

@NgModule({
  declarations: [
    AppComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    MainmenuComponent,
    MenuComponent,
    // NgxSpinnerModule,
    // TransactionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    AppRoutes,
    FormsModule,
    ReactiveFormsModule,
    PrimengMaterialUiModule,
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient]
      },
      isolate: true
  }),
   TranslateModule,
   HttpClientModule,
   PasswordModule,
   ScrollPanelModule,
   OrganizationChartModule,
   SpeedDialModule
  ],
  
  providers: [MessageService,TranslateService,CommonFunctionsService,CommonHttpService,EncryptDecryptService,CommonComponent, DatePipe,AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:   ErpInterceptor,
      multi: true
  },
  { provide: LocationStrategy, useClass: HashLocationStrategy },

  ],

  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
],

})
export class AppModule { }
