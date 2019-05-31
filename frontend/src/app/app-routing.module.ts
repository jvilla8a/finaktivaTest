import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistryComponent } from './components/registry/registry.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '',       redirectTo: '/logIn', pathMatch: 'full' },

  { path: 'singUp',     component: RegistryComponent },
  { path: 'logIn',      component: LoginComponent },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'edit/:id',   component: LoginComponent },
  { path: 'delete/:id', component: LoginComponent },

  { path: 'logOut', redirectTo: '/logIn' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
