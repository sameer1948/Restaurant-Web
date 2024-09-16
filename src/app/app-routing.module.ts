import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { AdminService } from './admin.service';
import { BranchComponent } from './admin/branch/branch.component';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'profile', component: ProfileComponent},
  {path:'settings', component: SettingsComponent},
  {path:'services', component: BranchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
