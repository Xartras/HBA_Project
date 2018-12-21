import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// .\node_modules\.bin\ng
// Dodatkowe moduly
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { // obsługa tabel poszczególnych komponentów oraz okien dialogowych (dodawanie wpisów)
        MatButtonModule, MatToolbarModule, MatSidenavModule
       ,MatIconModule, MatListModule, MatTableModule
       ,MatPaginatorModule, MatSortModule, MatCheckboxModule
       ,MatDialogModule
        } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';

// Import komponentow aplikacji
import { AppComponent } from './app.component';

// Poszczegolne zakladki aplikacji po zalogowaniu oraz menu
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { DetailsComponent } from './details/details.component';
import { HomeBillingsComponent } from './homebillings/homebillings.component';
import { MenuComponent } from './menu/menu.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { PlanningComponent } from './planning/planning.component';

// Komponenty zawierajace tabele
import { PeriodicFeesComponent } from './_03_data_tables/periodic-fees/periodic-fees.component';
import { BudgetPlanComponent } from './_03_data_tables/budget-plan/budget-plan.component';
import { HomeBillingsDataComponent } from './_03_data_tables/home-billings/home-billings.component';
import { TransactionsDataComponent } from './_03_data_tables/transactions/transactions-data.component';
import { SavingPlanComponent } from './_03_data_tables/saving-plan/saving-plan.component';

// Komponenty będące oknami dialogowymi do wprowadzania danych
import { RegisterComponent } from './_04_modal_dialogs/register/register.component';
import { AddPeriodicFeeDialogComponent } from './_04_modal_dialogs/add-periodic-fee-dialog/add-periodic-fee-dialog.component';
import { AddBudgetPlanDialogComponent } from './_04_modal_dialogs/add-budget-plan-dialog/add-budget-plan-dialog.component';
import { AddTransactionDialogComponent } from './_04_modal_dialogs/add-transaction-dialog/add-transaction-dialog.component';
import { AddHomeBillingItemDialogComponent } from './_04_modal_dialogs/add-home-billing-item-dialog/add-home-billing-item-dialog.component';
import { AddSavingPlanDialogComponent } from './_04_modal_dialogs/add-saving-plan-dialog/add-saving-plan-dialog.component'

// Serwisy
import { UserAuthGuard } from './_02_services/user-auth-guard.guard';
import { UserAuthService } from './_02_services/user-auth-service.service';
import { BudgetPlanService } from './_02_services/budget-plan-srvc.service';
import { PeriodicFeesService } from './_02_services/periodic-fees-srvc.service';
import { PeriodsService } from './_02_services/periods-srvc.service';
import { SavingPlanService } from './_02_services/saving-plan-srvc.service';
import { PeriodsComponent } from './_03_data_tables/periods/periods.component';

const routes : Routes = 
[
  { path: 'details', component: DetailsComponent, canActivate: [UserAuthGuard] },
  { path: 'transactions', component: TransactionsComponent, canActivate: [UserAuthGuard] },
  { path: 'homebillings', component: HomeBillingsComponent, canActivate: [UserAuthGuard] },
  { path: 'planning', component: PlanningComponent, canActivate: [UserAuthGuard] },
  { path: 'statistics', component: StatisticsComponent, canActivate: [UserAuthGuard] },
  { path: '', component: DetailsComponent, canActivate: [UserAuthGuard] },
  { path: 'login', component: LoginComponent}
]

@NgModule({
  declarations: [
    AppComponent, MenuComponent, HeaderComponent,

    DetailsComponent, HomeBillingsComponent, StatisticsComponent,
    TransactionsComponent, PlanningComponent,

    LoginComponent, RegisterComponent,

    PeriodicFeesComponent, BudgetPlanComponent, HomeBillingsDataComponent,
    TransactionsDataComponent, SavingPlanComponent,
    
    AddPeriodicFeeDialogComponent, AddBudgetPlanDialogComponent, AddTransactionDialogComponent, 
    AddHomeBillingItemDialogComponent, AddSavingPlanDialogComponent, PeriodsComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule, LayoutModule, HttpClientModule,
    MatButtonModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatCheckboxModule,
    MatListModule, MatTableModule, MatPaginatorModule, MatSortModule, MatDialogModule,
    
    RouterModule.forRoot(routes)
  ],
  entryComponents: [
    RegisterComponent,
    AddPeriodicFeeDialogComponent, AddBudgetPlanDialogComponent, AddTransactionDialogComponent, 
    AddHomeBillingItemDialogComponent
  ]
  ,
  providers: [UserAuthGuard, UserAuthService, BudgetPlanService
             ,PeriodicFeesService, PeriodsService, SavingPlanService],
  bootstrap: [AppComponent]
})
export class AppModule { }
