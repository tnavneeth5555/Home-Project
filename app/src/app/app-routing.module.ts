import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AboutusComponent} from './aboutus/aboutus.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HelpComponent} from './help/help.component';
import {HomeComponent} from './home/home.component';
import {LogindashboardComponent} from './logindashboard/logindashboard.component';
const routes: Routes = [
  { path: '', redirectTo:'/home', pathMatch:'full' },
  
  { path: 'aboutus', component: AboutusComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'help', component: HelpComponent },
  { path: 'home', component: HomeComponent },
  { path: 'logindashboard', component: LogindashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    onSameUrlNavigation:'reload',useHash:true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
