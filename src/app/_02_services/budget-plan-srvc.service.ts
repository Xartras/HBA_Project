import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BudgetPlanItem } from '../_01_models/budget-plan-item';

@Injectable({
  providedIn: 'root'
})
export class BudgetPlanService {

  budgetPlanURL = 'http://localhost:4000/BudgetPlan';

  constructor(private http: HttpClient) { }

  // Dodanie planu do bazy
  addBudgetPlan(newItem: BudgetPlanItem) {
    const obj = 
    {
      _id:      newItem.id,
      type:     newItem.type,
      category: newItem.category,
      name:     newItem.name,
      period:   newItem.period,
      amount:   newItem.amount,
      comment:  newItem.comment,
      actions:  newItem.actions

    };
    this.http.post(`${this.budgetPlanURL}/add`, obj).subscribe(res => console.log('Done', res));
  }

  // Aktualizacja planu w bazie
  updateBudgetPlan(updadingItem: BudgetPlanItem, id) 
  {
    const obj = {
      _id:      updadingItem.id,
      type:     updadingItem.type,
      category: updadingItem.category,
      name:     updadingItem.name,
      period:   updadingItem.period,
      amount:   updadingItem.amount,
      comment:  updadingItem.comment,
      actions:  updadingItem.actions
    };
    this
      .http
      .post(`${this.budgetPlanURL}/update/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }

  // Usuniecie planu z bazy
  deleteBudgetPlanItem(itemID) 
  {
    return this.http.get(`${this.budgetPlanURL}/delete/${itemID}`).subscribe(res => console.log('Done'));;
  }
}
