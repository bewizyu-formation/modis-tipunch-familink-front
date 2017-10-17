import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';



/* Services */
import { ConfigService } from './services/config.service';
import { NavigatorService } from './services/navigator.service';
import { AuthenticationService } from './services/authentication.service';
import { ProfilService } from './services/profil.service';

import { HeaderInterceptor } from './interceptors/header.interceptor';
import { AuthenticationInterceptor } from './interceptors/authentication.interceptor';

import {  MatProgressBarModule,
          MatIconModule,
          MatToolbarModule,
          MatMenuModule,
          MatFormFieldModule,
          MatInputModule,
          MatButtonModule,
          MatSelectModule,
          MatCardModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './routes/login/login.component';
import { DemandeMdpComponent } from './routes/demande-mdp/demande-mdp.component';
import { CreateUserComponent } from './routes/create-user/create-user.component';
import { HomeComponent } from './routes/home/home.component';
import { FooterComponent } from './shared/footer/footer.component';
import { GroupeComponent } from './routes/groupe/groupe.component';
import { ContactListComponent } from './routes/groupe/contact-list/contact-list.component';
import { SelectedContactComponent } from './routes/groupe/selected-contact/selected-contact.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    DemandeMdpComponent,
    CreateUserComponent,
    HomeComponent,
    FooterComponent,
    GroupeComponent,
    ContactListComponent,
    SelectedContactComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressBarModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
  ],
  providers: [
    ConfigService,
    NavigatorService,
    ProfilService,
    { provide: AuthenticationService, useClass: AuthenticationService },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
