import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
//import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { BranchComponent } from './admin/branch/branch.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guard/auth.guard';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  //{path:'profile', component: ProfileComponent},
  {path:'settings', component: SettingsComponent, canActivate : [authGuard]},
  {path:'services', component: BranchComponent},
  {path:'ad-home', component: AdminHomeComponent, canActivate : [authGuard]},
  {path:'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
