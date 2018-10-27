import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Dodatkowe moduly
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { // obsługa tabel poszczególnych komponentów oraz okien dialogowych (dodawanie wpisów)
        MatButtonModule, MatToolbarModule, MatSidenavModule
       ,MatIconModule, MatListModule, MatTableModule
       ,MatPaginatorModule, MatSortModule, MatCheckboxModule
       ,MatDialogModule
        } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { LayoutModule } from '@angular/cdk/layout';

// Import komponentow aplikacji
import { AppComponent } from './app.component';

// Poszczegolne zakladki aplikacji po zalogowaniu oraz menu
import { DetailsComponent } from './details/details.component';
import { HomeBillingsComponent } from './homebillings/homebillings.component';
import { MenuComponent } from './menu/menu.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { WerehouseComponent } from './werehouse/werehouse.component';

// Komponenty zawierajace tabele
import { PeriodicFeesComponent } from './_data_tables/periodic-fees/periodic-fees.component';
import { BudgetPlanComponent } from './_data_tables/budget-plan/budget-plan.component';
import { HomeBillingsDataComponent } from './_data_tables/home-billings/home-billings.component';
import { WerehouseDataComponent } from './_data_tables/werehouse/werehouse.component';
import { TransactionsDataComponent } from './_data_tables/transactions/transactions-data.component';

// Komponenty będące oknami dialogowymi do wprowadzania danych
import { LoginComponent } from './_modal_dialogs/login/login.component';
import { RegisterComponent } from './_modal_dialogs/register/register.component';
import { AddPeriodicFeeDialogComponent } from './_modal_dialogs/add-periodic-fee-dialog/add-periodic-fee-dialog.component';
import { AddBudgetPlanDialogComponent } from './_modal_dialogs/add-budget-plan-dialog/add-budget-plan-dialog.component';
import { AddTransactionDialogComponent } from './_modal_dialogs/add-transaction-dialog/add-transaction-dialog.component';
import { AddWerehouseItemDialogComponent } from './_modal_dialogs/add-werehouse-item-dialog/add-werehouse-item-dialog.component';
import { AddHomeBillingItemDialogComponent } from './_modal_dialogs/add-home-billing-item-dialog/add-home-billing-item-dialog.component'


const routes : Routes = 
[
  { path: 'details', component: DetailsComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'homebillings', component: HomeBillingsComponent },
  { path: 'werehouse', component: WerehouseComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: '', component: DetailsComponent }
]

@NgModule({
  declarations: [
    AppComponent, MenuComponent,

    DetailsComponent, HomeBillingsComponent, StatisticsComponent,
    TransactionsComponent, WerehouseComponent,

    LoginComponent, RegisterComponent,

    PeriodicFeesComponent, BudgetPlanComponent, HomeBillingsDataComponent,
    WerehouseDataComponent, TransactionsDataComponent, 
    
    AddPeriodicFeeDialogComponent, AddBudgetPlanDialogComponent, AddTransactionDialogComponent, 
    AddWerehouseItemDialogComponent, AddHomeBillingItemDialogComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    FormsModule, LayoutModule,
    MatButtonModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatCheckboxModule,
    MatListModule, MatTableModule, MatPaginatorModule, MatSortModule, MatDialogModule,    
    RouterModule.forRoot(routes)
  ],
  entryComponents: [
    LoginComponent, RegisterComponent,
    AddPeriodicFeeDialogComponent, AddBudgetPlanDialogComponent, AddTransactionDialogComponent, 
    AddWerehouseItemDialogComponent, AddHomeBillingItemDialogComponent
  ]
  ,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
