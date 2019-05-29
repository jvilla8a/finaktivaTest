import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent }     from './login/login.component';
import { AppComponent }       from './app.component';

const routes: Routes = [
  { path: '/',          component: AppComponent },
  { path: '/login',     component: LoginComponent },
  { path: '/dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
