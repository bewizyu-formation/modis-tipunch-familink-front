import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


/* Services */
import { ConfigService } from './services/config.service';
import { AuthenticationMockService } from './services/authentication-mock.service';


import {  MatProgressBarModule,
          MatIconModule,
          MatToolbarModule,
          MatMenuModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    HttpClientModule,
    MatProgressBarModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
  ],
  providers: [
    ConfigService,
    { provide: AuthenticationMockService, useClass: AuthenticationMockService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
