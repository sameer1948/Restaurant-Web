import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { DialogModule } from '@angular/cdk/dialog';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
//import { TransactionsComponent } from './orders/transactions/transactions.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AdminModule } from './admin/admin.module';
import { AddMenuComponent } from './menu/add-menu/add-menu.component';
import { ModifyMenuComponent } from './menu/modify-menu/modify-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RemoveMenuComponent } from './menu/remove-menu/remove-menu.component';

@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        //ProfileComponent,
        SettingsComponent,
       // TransactionsComponent,
        AddMenuComponent,
        ModifyMenuComponent,
        RemoveMenuComponent
    ],
    bootstrap: [AppComponent], 
    imports: [BrowserModule,
        AdminModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        DialogModule,
        FormsModule,
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
        MatSidenavModule,
        MatTableModule,
        MatToolbarModule,
        ReactiveFormsModule], 
        providers: [
        provideClientHydration(),
        provideHttpClient(withInterceptorsFromDi())
    ] ,
})
export class AppModule { }
