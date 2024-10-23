import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
//import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { BranchComponent } from './admin/branch/branch.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guard/auth.guard';
import { ErrorComponent } from './errors/error/error.component';
import { roleAdminGuard } from './guard/role-admin.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ProfileComponent } from './profile/profile.component';
import { MenuHomeComponent } from './menu/menu-home/menu-home.component';

const routes: Routes = [
  { path:'', component: UnauthorizedComponent },
  { path:'home', component: HomeComponent },  
  { path : 'menu', component:MenuHomeComponent},
  { path:'profile', component: ProfileComponent,   canActivate : [authGuard] },
  { path:'settings', component: SettingsComponent, canActivate : [authGuard] },
  { path:'services', component: BranchComponent },
  { path:'ad-home', component: AdminHomeComponent, 
                   canActivate : [authGuard, roleAdminGuard], 
                   data: { expectedRole: 'admin' } },
  { path:'login', component: LoginComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
