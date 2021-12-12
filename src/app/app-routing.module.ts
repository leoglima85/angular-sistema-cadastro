import { ExtratoComponent } from './components/extrato/extrato.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';

const routes: Routes = [
    { path: '', redirectTo: '', pathMatch:'full' },
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'home', component: HomeComponent },
    { path: 'profile', canActivate: [AngularFireAuthGuard], component: ProfileComponent },
    { path: 'dashboard',canActivate: [AngularFireAuthGuard], component: DashboardComponent },
    { path: 'cadastro', canActivate: [AngularFireAuthGuard], component: CadastroComponent },
    { path: 'extrato', canActivate: [AngularFireAuthGuard], component: ExtratoComponent },
    { path: '**', component: PagenotfoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }