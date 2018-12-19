import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PeriodicFeeItem } from '../_01_models/periodic-fee-item';

@Injectable({
  providedIn: 'root'
})
export class PeriodicFeesService {

  constructor(private http: HttpClient) { }

  periodicFeesURL = 'http://localhost:4000/PeriodicFees';

  // Dodanie planu do bazy
  addBudgetPlan(newItem: PeriodicFeeItem) {
    const obj = 
    {
      category:        newItem.category,
      name:            newItem.name,
      paidUntil:       newItem.paidUntil,
      paymentPeriod:   newItem.paymentPeriod,
      paymentDeadline: newItem.paymentDeadline,
      warnings:        newItem.warnings,
      actions:         newItem.actions

    };
    this.http.post(`${this.periodicFeesURL}/add`, obj).subscribe(res => console.log('Done'));
  }

  // Aktualizacja planu w bazie
  updateBudgetPlan(updadingItem: PeriodicFeeItem) 
  {
    const obj = {
      category:        updadingItem.category,
      name:            updadingItem.name,
      paidUntil:       updadingItem.paidUntil,
      paymentPeriod:   updadingItem.paymentPeriod,
      paymentDeadline: updadingItem.paymentDeadline,
      warnings:        updadingItem.warnings,
      actions:         updadingItem.actions
    };
    this
      .http
      .post(`${this.periodicFeesURL}/update/${updadingItem.id}`, obj)
      .subscribe(res => console.log('Done'));
  }

  // Usuniecie planu z bazy
  deleteBudgetPlanItem(itemID) 
  {
    return this.http.get(`${this.periodicFeesURL}/delete/${itemID}`).subscribe(res => console.log('Done'));;
  }
}
