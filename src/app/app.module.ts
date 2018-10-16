import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Dodatkowe moduly
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { 
        MatButtonModule, MatToolbarModule, MatSidenavModule
       ,MatIconModule, MatListModule, MatTableModule
       ,MatPaginatorModule, MatSortModule, MatCheckboxModule
        } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { LayoutModule } from '@angular/cdk/layout';

// Import komponentow aplikacji
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DetailsComponent } from './details/details.component';
import { HomeBillingsComponent } from './homebillings/homebillings.component';
import { MenuComponent } from './menu/menu.component';
import { MenuItemComponent } from './menu/menuitem.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { WerehouseComponent } from './werehouse/werehouse.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PeriodicFeesComponent } from './_data_tables/periodic-fees/periodic-fees.component';
import { BudgetPlanComponent } from './_data_tables/budget-plan/budget-plan.component';
import { LogRegComponent } from './log-reg/log-reg.component';

const routes : Routes = 
[
  { path: 'details', component: DetailsComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'homebillings', component: HomeBillingsComponent },
  { path: 'werehouse', component: WerehouseComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: '', redirectTo: '/details', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DetailsComponent,
    HomeBillingsComponent,
    MenuComponent,
    MenuItemComponent,
    StatisticsComponent,
    TransactionsComponent,
    WerehouseComponent,
    LoginComponent,
    RegisterComponent,
    RegisterComponent,
    PeriodicFeesComponent,
    BudgetPlanComponent,
    LogRegComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    LayoutModule,
    MatButtonModule, 
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule, 
    MatListModule,
    MatTableModule, 
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
