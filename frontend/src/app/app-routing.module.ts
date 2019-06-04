import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistryComponent } from './components/registry/registry.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditComponent } from './components/edit/edit.component';

const routes: Routes = [
  { path: '',       redirectTo: '/logIn', pathMatch: 'full' },

  { path: 'singUp',     component: RegistryComponent },
  { path: 'logIn',      component: LoginComponent },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'edit/:id',   component: EditComponent },
  { path: 'delete/:id', component: LoginComponent },

  { path: 'logOut', redirectTo: '/logIn' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation : 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
