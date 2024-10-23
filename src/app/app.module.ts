import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatLabel } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
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
//import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
//import { TransactionsComponent } from './orders/transactions/transactions.component';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AdminModule } from './admin/admin.module';
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
import { SideNavComponent } from './side-nav/side-nav.component';
import { MenuHomeComponent } from './menu/menu-home/menu-home.component';


@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        //ProfileComponent,
        SettingsComponent,
       // TransactionsComponent,
        AddMenuComponent,
        ModifyMenuComponent,
        RemoveMenuComponent,
        NewOrderComponent,
        LoginComponent,
        ErrorComponent,
        UnauthorizedComponent,
        MenuBarComponent,
        SideNavComponent,
        MenuHomeComponent,
    ],
    bootstrap: [AppComponent],
    
    imports: [
        BrowserModule,        
        AdminModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        DialogModule,
        FormsModule,
        MatBadgeModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatDividerModule,
        MatGridListModule,
        MatListModule,
        MatLabel,
        MatMenuModule,
        MatIcon,
        MatInputModule,
        MatSelectModule,
        MatSnackBarModule,        
        MatSliderModule,
        MatSidenavModule,
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
        { provide: ErrorHandler, useClass: GlobalErrorHandler }
    ] ,
})
export class AppModule { }
