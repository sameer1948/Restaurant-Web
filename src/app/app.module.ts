import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';

import { DialogModule } from '@angular/cdk/dialog';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SettingsComponent } from './settings/settings.component';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AddMenuComponent } from './menu/add-menu/add-menu.component';
import { ModifyMenuComponent } from './menu/modify-menu/modify-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RemoveMenuComponent } from './menu/remove-menu/remove-menu.component';
import { NewOrderComponent } from './orders/new-order/new-order.component';
import { LoginComponent } from './login/login.component';
import { authInterceptor } from './interceptor/auth.interceptor';
import { GlobalErrorHandler } from './services/global-error-handler';
import { ErrorComponent } from './errors/error/error.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { MenuHomeComponent } from './menu/menu-home/menu-home.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordDialogComponent } from './profile/change-password-dialog/change-password-dialog.component';
import { MemberComponent } from './member/member/member.component';
import { AddMemberComponent } from './member/add-member/add-member.component';
import { UpdateMemberComponent } from './member/update-member/update-member.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { VeiwRemoveMemberComponent } from './member/veiw-remove-member/veiw-remove-member.component';
import { OrderHomeComponent } from './orders/order-home/order-home.component';
import { MenuDescriptionComponent } from './menu/menu-description/menu-description.component';
import { CreateOrderComponent } from './orders/create-order/create-order.component';
import { AboutComponent } from './about/about.component';
import { CouponHomeComponent } from './coupon/coupon-home/coupon-home.component';
import { CouponAddComponent } from './coupon/coupon-add/coupon-add.component';
import { CouponViewRemoveComponent } from './coupon/coupon-view-remove/coupon-view-remove.component';
import { CouponUpdateComponent } from './coupon/coupon-update/coupon-update.component';
import { MatNativeDateModule } from '@angular/material/core';
import { TaxFeeComponent } from './tax-fee/tax-fee/tax-fee.component';
import { AddTaxFeeComponent } from './tax-fee/add-tax-fee/add-tax-fee.component';
import { UpdateTaxFeeComponent } from './tax-fee/update-tax-fee/update-tax-fee.component';
import { VeiwRemoveTaxFeeComponent } from './tax-fee/veiw-remove-tax-fee/veiw-remove-tax-fee.component';
import { ErrorDialogComponent } from './common/error-dialog/error-dialog.component';
import { ViewCancelOrderComponent } from './orders/view-cancel-order/view-cancel-order.component';
import { SuccessDialogComponent } from './common/success-dialog/success-dialog.component';

@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        ProfileComponent,
        SettingsComponent,
        AddMenuComponent,
        ModifyMenuComponent,
        RemoveMenuComponent,
        NewOrderComponent,
        LoginComponent,
        ErrorComponent,
        UnauthorizedComponent,
        MenuBarComponent,        
        MenuHomeComponent,
        ChangePasswordDialogComponent,
        MemberComponent,        
        AddMemberComponent,
        VeiwRemoveMemberComponent,
        UpdateMemberComponent,
        OrderHomeComponent,
        MenuDescriptionComponent,
        CreateOrderComponent,
        AboutComponent,
        CouponHomeComponent,
        CouponAddComponent,
        CouponViewRemoveComponent,
        CouponUpdateComponent,
        TaxFeeComponent,
        AddTaxFeeComponent,
        UpdateTaxFeeComponent,
        VeiwRemoveTaxFeeComponent,
        ErrorDialogComponent,
        ViewCancelOrderComponent,
        SuccessDialogComponent,
    ],
    bootstrap: [AppComponent],
    
    imports: [
        BrowserModule,        
        AppRoutingModule,
        BrowserAnimationsModule,
        DialogModule,
        FormsModule,
        MatBadgeModule,
        MatButtonModule,
        MatCardModule, 
        MatCheckboxModule,
        MatChipsModule,    
        MatDatepickerModule,
        MatNativeDateModule,   
        MatDialogModule,
        MatDividerModule,
        MatFormFieldModule,
        MatGridListModule,
        MatListModule,
        MatLabel,
        MatMenuModule,
        MatIcon,
        MatInputModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatSelectModule,
        MatSnackBarModule,        
        MatSliderModule,
        MatSidenavModule,
        MatSortModule,        
        MatTableModule,
        MatToolbarModule,
        MatTooltip,
        ReactiveFormsModule],         
        providers: [
        provideClientHydration(),
        provideHttpClient(
            withInterceptors([authInterceptor]), // Register your interceptor here
            withFetch() // Enable Fetch API support
          ),
        //{ provide: ErrorHandler, useClass: GlobalErrorHandler }
    ] ,
})
export class AppModule { }
