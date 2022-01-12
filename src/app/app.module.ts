import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ExtratoComponent } from './components/extrato/extrato.component';
import { ConsultaComponent } from './components/consulta/consulta.component';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { EditarComponent } from './components/editar/editar.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { LogEventosComponent } from './components/log-eventos/log-eventos.component';
import { AdministracaoComponent } from './components/administracao/administracao.component'



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    ProfileComponent,
    DashboardComponent,
    CadastroComponent,
    PagenotfoundComponent,
    ExtratoComponent,
    ConsultaComponent,
    EditarComponent,
    LogEventosComponent,
    AdministracaoComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    AppRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTabsModule,
    MatSidenavModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatSelectModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaskModule.forRoot({}),
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
