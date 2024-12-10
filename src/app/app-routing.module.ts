import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guard/auth.guard';
import { ErrorComponent } from './errors/error/error.component';
import { roleAdminGuard } from './guard/role-admin.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ProfileComponent } from './profile/profile.component';
import { MenuHomeComponent } from './menu/menu-home/menu-home.component';
import { MemberComponent } from './member/member/member.component';
import { OrderHomeComponent } from './orders/order-home/order-home.component';
import { AboutComponent } from './about/about.component';
import { CouponHomeComponent } from './coupon/coupon-home/coupon-home.component';
import { TaxFeeComponent } from './tax-fee/tax-fee/tax-fee.component';
import { NewOrderComponent } from './orders/new-order/new-order.component';

const routes: Routes = [
  { path : '', component: HomeComponent },
  { path : 'new-order', component: NewOrderComponent },  
  { path : 'order', component: OrderHomeComponent , canActivate : [authGuard,],},
  { path : 'coupon', component : CouponHomeComponent , canActivate : [authGuard,],},
  { path : 'tax', component : TaxFeeComponent , canActivate : [authGuard,],},
  { path : 'menu', component:MenuHomeComponent, canActivate : [authGuard,],},
  { path : 'login', component: LoginComponent },
  { path : 'members', component:MemberComponent, canActivate : [authGuard, roleAdminGuard],},
  { path : 'profile', component: ProfileComponent,   canActivate : [authGuard] },
  { path : 'settings', component: SettingsComponent, canActivate : [authGuard] },
  { path : 'ad-home', component: AdminHomeComponent, 
                   canActivate : [authGuard, roleAdminGuard], 
                   data: { expectedRole: 'admin' } },
  { path : 'about', component: AboutComponent },
  { path : 'error', component: ErrorComponent },  
  { path : 'unauthorized', component: UnauthorizedComponent },  
  { path: '**', component: ErrorComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
